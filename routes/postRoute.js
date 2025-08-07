const express = require('express');
const router = express.Router();
const postService = require('../services/postService');
const { isSignIn } = require('../common/authorization');
const { uploadMedia } = require('../common/uploadMediaMiddleware');
const authService = require('../services/authService');
const Comment = require('../models/postModel').discriminators?.Comment || require('../models/postModel').model('Comment') || require('../models/commentModel');

// Middleware to check if user is signed in
// router.use(isSignIn,(req,res)=>{console.log(req.user)});
router.use(authService.protect);

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new post with media upload
router.post('/', uploadMedia, async (req, res) => {
  try {
    const content = req.body.content;
    const privacy = req.body.privacy || 'Public';
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const images = req.files['images'] ? req.files['images'].map(file => file.buffer) : [];
    const videos = req.files['videos'] ? req.files['videos'].map(file => file.buffer) : [];

    const post = await postService.createPost(req.user._id, content, images, videos, privacy);
    res.status(201).json(post);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

// Add a comment to a post or reply to a comment
router.post('/:postId/comments', async (req, res) => {
  try {
    const { content, parentCommentId } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    const comment = await postService.addComment(req.params.postId, req.user._id, content, parentCommentId);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit a comment
router.put('/comments/:commentId', async (req, res) => {
  try {
    const { newContent } = req.body;
    if (!newContent) {
      return res.status(400).json({ message: 'New content is required' });
    }
    const comment = await postService.editComment(req.params.commentId, req.user._id, newContent);
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a comment
router.delete('/:postId/comments/:commentId', async (req, res) => {
  try {
    await postService.deleteComment(req.params.postId, req.params.commentId, req.user._id);
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// React to a comment
router.post('/comments/:commentId/reactions', async (req, res) => {
  try {
    const { reactionType } = req.body;
    if (!reactionType) {
      return res.status(400).json({ message: 'Reaction type is required' });
    }
    const comment = await postService.reactToComment(req.params.commentId, req.user._id, reactionType);
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single post by ID
router.get('/:postId', async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (req.params.ctId) {
      if (post.comments.some(comment => comment._id === req.params.ctId)) {

      } else {
        try {
          const comment = await Comment.findById(req.params.ctId)
            .populate('author', ['username', "profileImage"])
            .populate({
              path: 'ancestors',
              populate: [
                { path: 'author', select: 'username profileImage' },
                { path: 'reactions.user', select: 'username' },
                {
                  path: 'replies', populate: [
                    { path: 'author', select: 'username profileImage' },
                    { path: 'reactions.user', select: 'username' }
                  ]
                }
              ]
            })

          let parent = comment.ancestors[comment.ancestors.length - 1]

          for (let index = comment.ancestors.length - 2; index >= 0; index--) {


            const ind = comment.ancestors[index].replies.findIndex(reply => reply._id === parent._id);
            if (ind !== -1) {
              comment.ancestors[index].replies[ind] = parent
              parent = comment.ancestors[index]
              
              if (index == 0) {
                const ind = post.comments.findIndex(comment => comment._id === parent._id);
                post.comments[ind]=parent
              }
            }


          }


        } catch (error) {
          res.status(500).json({ message: error.message });

        }

      }
    }
    res.json(post);


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle like on a post
router.post('/:postId/like', async (req, res) => {
  try {
    const post = await postService.toggleLike(req.params.postId, req.user._id);

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
});

// Get replies for a specific comment
router.get('/comments/:commentId/replies', async (req, res) => {
  try {
    const replies = await postService.getRepliesByCommentId(req.params.commentId);
    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





module.exports = router;
