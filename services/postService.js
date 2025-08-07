const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Post = require('../models/postModel').discriminators?.Post || require('../models/postModel').model('Post') || require('../models/postModel');
const Comment = require('../models/postModel').discriminators?.Comment || require('../models/postModel').model('Comment') || require('../models/commentModel');

const ffmpeg = require('fluent-ffmpeg');

function optimizeVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        // '-c copy'

        // '-movflags faststart'
        // ,
        // '-c:v libx264',
        // '-profile:v high',
        '-level 5.0'
        // ,
        // '-pix_fmt yuv420p',
        // '-c:a aac',
        // '-b:a 192k'
      ])
      .save(outputPath)
      .on('save', () => console.log("mmmmmmmmmmmm")
      )
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err));
  });
}

async function isCompatibleVideo(filePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      console.log("metadata", metadata);

      if (err) return reject(err);

      const videoStream = metadata.streams.find(s => s.codec_type === 'video');
      const audioStream = metadata.streams.find(s => s.codec_type === 'audio');
      // console.log("videoStream", videoStream);
      // console.log("audioStream", audioStream);

      if (!videoStream || !audioStream) {
        return resolve(false);
      }

      const isH264 = videoStream.codec_name === 'h264';
      const isAAC = audioStream.codec_name === 'aac';
      // console.log(metadata);

      // Check container format
      const format = metadata.format.format_name; // e.g., mp4, mov, mkv

      if (isH264 && isAAC && (format === 'mp4' || format === 'mov')) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}







// Tell fluent-ffmpeg exactly where ffmpeg.exe is:
const ffmpegPath = path.join(__dirname, "ffmpeg-7.1.1-essentials_build/ffmpeg-7.1.1-essentials_build/bin", 'ffmpeg.exe');  // adjust if on Windows
// console.log(ffmpegPath)
ffmpeg.setFfmpegPath(ffmpegPath);
// function optimizeVideo(inputPath, outputPath) {
//   return new Promise((resolve, reject) => {
//     ffmpeg(inputPath)
//       .outputOptions('-movflags +faststart')
//       .output(outputPath)
//       .on('end', () => {
//         console.log('✅ Video optimized!');
//         resolve();
//       })
//       .on('error', (err) => {
//         console.error('❌ FFmpeg error:', err);
//         reject(err);
//       })
//       .run();
//   });
// }



exports.getAllPosts = async () => {
  return await Post.find()
    .populate('author', ['username', "profileImage"])
    .populate({
      path: 'comments',
      populate: [
        { path: 'author', select: 'username profileImage' },
        { path: 'reactions.user', select: 'username' },
        // {
        //   path: 'replies', populate: [
        //     { path: 'author', select: 'username profileImage' },
        //     { path: 'reactions.user', select: 'username' }
        //   ]
        // }
      ]
    })
    .populate('likes', 'username') // populate likes with username
    .sort({ createdAt: -1 });
};

exports.getPostById = async (postId) => {
  return await Post.findById(postId)
    .populate('author', 'username profileImage')
    .populate({
      path: 'comments',
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
    .populate('likes', 'username'); // populate likes with username





};

const saveFiles = async (files, folder) => {
  const savedPaths = [];
  const uploadDir = path.join(__dirname, '..', 'frontend', 'public', 'uploads', folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  for (const file of files) {
    const ext = file.originalname ? path.extname(file.originalname) : '.bin';
    const filename = uuidv4() + ext;
    const filepath = path.join(uploadDir, filename);
    // Convert ArrayBuffer to Buffer if needed
    let bufferData = file.buffer;
    if (bufferData instanceof ArrayBuffer) {
      bufferData = Buffer.from(bufferData);
    }
    fs.writeFileSync(filepath, bufferData);
    savedPaths.push(`/uploads/${folder}/${filename}`);
  }
  console.log(savedPaths)
  return savedPaths;
};

exports.createPost = async (authorId, content, images = [], videos = [], privacy = 'Public') => {
  const savedImages = await saveFiles(images, 'posts/images');
  const savedVideos = await saveFiles(videos, 'posts/videos');
  if (savedVideos[0]) {
    for (let index = 0; index < savedVideos.length; index++) {
      try {
        const inputPath = path.join(__dirname, '..', 'frontend', 'public', savedVideos[index])
        const outputPath = path.join(__dirname, '..', 'frontend', 'public', "uploads/posts/optimizedvid", savedVideos[index].replace(".bin", ".mp4"))
        console.log(inputPath);
        console.log(outputPath);

        // isCompatibleVideo(inputPath)

        optimizeVideo(inputPath, outputPath)
          .then((video) => {
            console.log(video)
            console.log("video")

          })
          .catch((err) => {
            console.log(err)
          })
        savedVideos[index] = savedVideos[index].replace(".bin", ".mp4")

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Video processing failed' });
      }
    }
  }


  const post = new Post({ author: authorId, content, images: savedImages, videos: savedVideos, privacy });
  return await post.save();
};

const Notification = require('../models/notificationModel');

exports.addComment = async (postId, authorId, content, parentCommentId = null) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  const comment = new Comment({ author: authorId, content, reactions: [], replies: [] });

  // Parse mentions in content (e.g., @username)
  const mentionRegex = /@(\w+)/g;
  let match;
  const mentionedUsernames = new Set();
  while ((match = mentionRegex.exec(content)) !== null) {
    mentionedUsernames.add(match[1]);
  }

  // For each mentioned username, create a notification
  for (const username of mentionedUsernames) {
    const mentionedUser = await require('../models/userModel').findOne({ username });
    if (mentionedUser) {
      const notification = new Notification({
        user: mentionedUser._id,
        message: `You were mentioned in a comment`,
        avatar: post.author.profileImage || '',
        type: 'mention',
        href: `/posts/${postId}#comment-${comment._id}`,
        time: new Date(),
        from: authorId,
        active: true
      });
      await notification.save();
    }
  }

  // Notify post author if commenter is not the post author
  if (post.author.toString() !== authorId.toString()) {
    const notification = new Notification({
      user: post.author,
      message: `Someone commented on your post`,
      avatar: post.author.profileImage || '',
      type: 'comment',
      href: `/posts/${postId}#comment-${comment._id}`,
      time: new Date(),
      from: authorId,
      active: true
    });
    await notification.save();
  }

  if (parentCommentId) {
    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      throw new Error('Parent comment not found');
    }
    parentComment.replies.push(comment._id);
    comment.ancestors = [...parentComment.ancestors, parentComment._id]
    await comment.save();
    await parentComment.save();
  } else {
    post.comments.push(comment._id);
    await comment.save();
    await post.save();
  }
  return comment;
};

exports.editComment = async (commentId, authorId, newContent) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.author.toString() !== authorId.toString()) {
    throw new Error('Unauthorized');
  }
  comment.content = newContent;
  await comment.save();
  return comment;
};

exports.deleteComment = async (postId, commentId, authorId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.author.toString() !== authorId.toString()) {
    throw new Error('Unauthorized');
  }
  // Remove comment from post or parent comment
  if (post.comments.includes(commentId)) {
    post.comments.pull(commentId);
    await post.save();
  } else {
    // Search in replies recursively (not implemented here for brevity)
  }
  await Comment.findByIdAndDelete(commentId);
  return { message: 'Comment deleted' };
};

exports.reactToComment = async (commentId, userId, reactionType) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  const existingReactionIndex = comment.reactions.findIndex(r => r.user.toString() === userId.toString());
  if (existingReactionIndex !== -1) {
    if (comment.reactions[existingReactionIndex].type === reactionType) {
      // Remove reaction if same type clicked again
      comment.reactions.splice(existingReactionIndex, 1);
    } else {
      // Update reaction type
      comment.reactions[existingReactionIndex].type = reactionType;
    }
  } else {
    comment.reactions.push({ user: userId, type: reactionType });
  }
  await comment.save();
  return comment;
};

exports.getRepliesByCommentId = async (commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  return await Comment.find({ _id: { $in: comment.replies } })
    .populate('author', 'username profileImage')
    .populate('reactions.user', 'username');
};

exports.toggleLike = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  const index = post.likes.indexOf(userId);
  if (index === -1) {
    post.likes.push(userId);
  } else {
    post.likes.splice(index, 1);
  }
  post.updatedAt = Date.now();
  return await post.save();
};
