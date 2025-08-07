
document.addEventListener('DOMContentLoaded', () => {
  // Get references to DOM elements for posts container, input fields, and buttons
  const postsContainer = document.getElementById('posts-container');
  const postContentInput = document.getElementById('post-content');
  const postButton = document.getElementById('post-button');
  const postImagesInput = document.getElementById('post-images');
  const postVideosInput = document.getElementById('post-videos');
  let currentUserId = null;

  // Fetch the current logged-in user's ID from the backend API
  async function fetchCurrentUser() {
    try {
      const response = await fetch('/api/v1/users/getMe');
      if (!response.ok) throw new Error('Failed to fetch current user');
      const data = await response.json();
      currentUserId = data.data._id;
      console.log(currentUserId);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchPostById(postId, ctId) {
    try {
      const url = new URL(`/api/v1/posts/${postId}`, window.location.origin);
      if (ctId) {
        url.searchParams.append('ctId', ctId);

      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch post');
      const post = await response.json();
      renderPosts([post]); // renderPosts expects an array
      return post;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function fetchPosts() {
    try {
      const response = await fetch('/api/v1/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const posts = await response.json();
      await renderPosts(posts);



      //   document.querySelectorAll('video').forEach(video => {
      //   ['waiting', 'stalled', 'buffered', 'playing', 'error'].forEach(event => {
      //     video.addEventListener(event, () => {
      //       // console.log(`Event: ${event} - currentSrc: ${video.currentSrc}`);
      //       console.log(`Event: ${event} - currentSrc: ${video.currentSrc}`);

      //     });
      //   });
      // });
    } catch (error) {
      console.error(error);
    }
  }

  // On page load, check if URL is /posts/:postId and load single post
  async function init() {
    postsContainer.innerHTML = '';

    const pathMatch = window.location.pathname.match(/^\/posts\/([a-fA-F0-9]{24})$/);
    if (pathMatch) {
      const postId = pathMatch[1];
      await fetchPostById(postId);

      // After rendering, scroll to comment if hash present
      if (window.location.hash && window.location.hash.startsWith('#comment-')) {
        const commentId = window.location.hash.substring(1);
        const commentElement = document.getElementById(commentId);
        if (commentElement) {
          // Expand nested replies if hidden
          let parent = commentElement.parentElement;
          while (parent) {
            if (parent.classList && parent.classList.contains('nested-replies') && parent.style.display === 'none') {
              parent.style.display = 'block';
              const seeRepliesBtn = parent.previousElementSibling;
              if (seeRepliesBtn && seeRepliesBtn.classList.contains('see-replies-btn')) {
                seeRepliesBtn.textContent = 'Hide replies';
              }
            }
            parent = parent.parentElement;
          }
          await fetchPosts();

          commentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          commentElement.style.backgroundColor = '#ffff99';

          setTimeout(() => {
            commentElement.style.backgroundColor = '';
          }, 2000);
        }
      }
    } else {
      await fetchPosts();
    }
  }

  // fetchCurrentUser().then(init);

  async function renderReactions(reactions) {
    if (!reactions || reactions.length === 0) return '';
    const reactionCounts = {};
    reactions.forEach(r => {
      reactionCounts[r.type] = (reactionCounts[r.type] || 0) + 1;
    });
    return Object.entries(reactionCounts).map(([type, count]) => {
      return `<span class="reaction">${type} ${count}</span>`;
    }).join(' ');
  }
  function renderComments(comments, postId, depth = 0) {
    if (!comments || comments.length === 0) return '<p class="text-gray-400 p-2">No comments yet</p>';
    return comments.map(comment => {
      const isAuthor = currentUserId === comment.author._id;
      const reactionsHtml = renderReactions(comment.reactions);
      const hasReplies = comment.replies && comment.replies.length > 0;
      // Initially do not render replies, show "See replies" button if replies exist
      let repliesHtml = `<div class="nested-replies" data-parent-comment-id="${comment._id}"></div>`;
      let seeRepliesButton = hasReplies ? `<button class="see-replies-btn text-blue-400 text-xs hover:underline cursor-pointer">See replies (${comment.replies.length})</button>` : '';

      if (hasReplies) {
        if (comment.replies[0]._id) {
          repliesHtml = renderComments(comment.replies, null, depth + 1)
          seeRepliesButton = '';

        }

      }
      // Parse mentions in comment content and replace with links
      const mentionRegex = /@(\w+)/g;
      const contentWithMentions = comment.content.replace(mentionRegex, (match, username) => {
        return `<a href="#comment-${comment._id}" class="mention-link text-blue-400 hover:underline">@${username}</a>`;
      });

      return `
        <div class="comment rounded-lg p-3 mb-2 bg-[#1e2a38]" style="margin-left: ${depth * 20}px;" data-comment-id="${comment._id}" id="comment-${comment._id}">
          <div class="flex items-center gap-3 mb-1">
            <img src="${comment.author.profileImage || '/images/default-avatar.png'}" alt="avatar" class="w-8 h-8 rounded-full object-cover border border-gray-600" />
            <div>
              <p class="text-white font-semibold text-sm">${comment.author.username}</p>
              <small class="text-gray-400 text-xs">${new Date(comment.createdAt).toLocaleString()}</small>
            </div>
          </div>
          <p class="text-white text-sm mb-2">${contentWithMentions}</p>
          <div class="comment-actions flex gap-4 text-xs text-gray-400 mb-2">
            <button class="reply-btn hover:underline hover:text-blue-400 cursor-pointer">Reply</button>
            <button class="react-btn hover:underline hover:text-red-400 cursor-pointer">React</button>
            ${isAuthor ? '<button class="edit-btn hover:underline hover:text-yellow-400 cursor-pointer">Edit</button><button class="delete-btn hover:underline hover:text-red-600 cursor-pointer">Delete</button>' : ''}
          </div>
          <div class="reactions mb-2">${reactionsHtml}</div>
          ${seeRepliesButton}
          <div class="replies">${repliesHtml}</div>
          <div class="reply-form hidden mb-2">
            <input type="text" class="reply-input w-full rounded border border-gray-600 px-2 py-1 text-black" placeholder="Write a reply..." />
            <button class="reply-submit mt-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Post Reply</button>
          </div>
          <div class="edit-form hidden mb-2">
            <input type="text" class="edit-input w-full rounded border border-gray-600 px-2 py-1" value="${comment.content}" />
            <button class="edit-submit mt-1 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500">Save</button>
            <button class="edit-cancel mt-1 ml-2 bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">Cancel</button>
          </div>
        </div>
      `;
    }).join('');

  }

  async function renderPosts(posts) {
    // postsContainer.innerHTML = '';
    // init()
    posts.forEach(post => {
      const likedByCurrentUser = currentUserId && post.likes && post.likes.some(user => user._id === currentUserId);
      const postElement = document.createElement('div');
      postElement.className = 'mb-6 bg-[#101a23] rounded-lg p-4';

      // Render comments HTML
      const commentsHtml = renderComments(post.comments, post._id);



      postElement.innerHTML = `
        <div class="flex items-center gap-4 bg-[#101a23] px-4 min-h-[72px] py-2 justify-between">
          <div class="flex items-center gap-4">
            <div
              class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
              style='background-image: url("${post.author.profileImage || "/images/default-avatar.png"}")'
            ></div>
            <div class="flex flex-col justify-center">
              <p class="text-white text-base font-medium leading-normal line-clamp-1">${post.author.username}</p>
              <p class="text-[#90aecb] text-sm font-normal leading-normal line-clamp-2">${post.author.profession || "Attending Physician"}</p>
            </div>
          </div>
          <div class="shrink-0">
            <button
              class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#223649] text-white text-sm font-medium leading-normal w-fit"
            >
              <span class="truncate">Follow</span>
            </button>
          </div>
        </div>
        <p class="text-[#90aecb] text-sm font-normal leading-normal pb-3 pt-1 px-4">${new Date(post.createdAt).toLocaleDateString()}</p>
        <p class="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">${post.content}</p>
        <div class="flex w-full grow bg-[#101a23] @container py-3">
          <div class="w-full gap-1 overflow-hidden bg-[#101a23] @[480px]:gap-2 aspect-[3/2] flex">
            ${post.images.length > 0 ? `
              <div
                class="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                style='background-image: url("${post.images[0]}")'
              ></div>
            ` : post.videos.length > 0 ? `
              <video controls class="w-full rounded-none flex-1 aspect-video">
                <source src="${post.videos[0]}" type="video/mp4" />
              </video>
            ` : ''}
          </div>
        </div>




        <div class="flex flex-wrap gap-4 px-4 py-2 py-2">
          <div  class="flex items-center justify-center gap-2 px-3 py-2 like-button text-[#90aecb]" data-post-id="${post._id}">
            <div style="cursor:pointer" class="text-[#90aecb]" data-icon="ThumbsUp" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="${likedByCurrentUser ? "#0b79ee" : "currentColor"}" viewBox="0 0 256 256">
                <path
                  d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"
                ></path>
              </svg>
            </div>
            <p class="text-[13px] font-bold leading-normal tracking-[0.015em]">${post.likes ? post.likes.length : 0}</p>
          </div>
          <div class="flex items-center justify-center gap-2 px-3 py-2">
            <div class="text-[#90aecb]" data-icon="Smiley" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#90aecb] text-[13px] font-bold leading-normal tracking-[0.015em]">5</p>
          </div>
          <div class="flex items-center justify-center gap-2 px-3 py-2">
            <div class="text-[#90aecb]" data-icon="Heart" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46,46,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#90aecb] text-[13px] font-bold leading-normal tracking-[0.015em]">12</p>
          </div>
          <div class="flex items-center justify-center gap-2 px-3 py-2">
            <div class="text-[#90aecb]" data-icon="ChatCircle" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#90aecb] text-[13px] font-bold leading-normal tracking-[0.015em]">8</p>
          </div>
        </div>
      </div>
      
        <!-- Comments Section -->
    
         <div class="comments-section px-4 py-2 border-t border-gray-700">
          ${commentsHtml}
          <div class="flex gap-2 mt-2">
            <input type="text" class="comment-input flex-1 rounded px-2 py-1 text-black" placeholder="Add a comment..." />
            <button class="comment-submit bg-blue-600 text-white px-3 rounded">Post</button>
          </div>
        </div>
      `;

      const videos = postElement.querySelectorAll('video');
      for (let index = 0; index < videos.length; index++) {
        const video = videos[index];

        video.addEventListener('play', () => {


          document.querySelectorAll('video').forEach(v => {
            if (v !== video) {
              v.pause();
            }
          });
        })

        video.addEventListener('progress', () => {
          const buffered = video.buffered;
          if (buffered.length > 0) {
            const bufferedSeconds = buffered.end(buffered.length - 1);
            console.log(`for: ${post.content}`);
            console.log(`Buffered up to: ${bufferedSeconds} seconds`);
          }
        });

        // video.addEventListener("pause", () => {


        // })

        video.addEventListener('error', () => {
          let error = video.error;
          console.log(error)
          if (error) {
            switch (error.code) {
              case error.MEDIA_ERR_ABORTED:
                errorMsg.textContent = "You aborted the video playback.";
                break;
              case error.MEDIA_ERR_NETWORK:
                errorMsg.textContent = "A network error caused the video download to fail.";
                break;
              case error.MEDIA_ERR_DECODE:
                errorMsg.textContent = "The video playback was aborted due to a corruption or unsupported video format.";
                break;
              case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                errorMsg.textContent = "The video format is not supported.";
                break;
              default:
                errorMsg.textContent = "An unknown error occurred.";
            }
          }
        });

      }






      const likeButton = postElement.querySelectorAll('.like-button')[0];
      likeButton.addEventListener('click', async (event) => {




        const postId = likeButton.getAttribute('data-post-id');
        try {
          const response = await fetch(`/api/v1/posts/${postId}/like`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) throw new Error('Failed to toggle like');
          const updatedPost = await response.json();
          // Update like count in UI
          const likeCount = likeButton.querySelector('p');
          likeCount.textContent = updatedPost.likes.length;
          // Update SVG fill color
          const svg = likeButton.querySelector('svg');
          if (updatedPost.likes.some(userId => userId.toString() === currentUserId)) {
            svg.setAttribute('fill', '#0b79ee');
          } else {
            svg.setAttribute('fill', 'rgb(144 174 203)');
          }
        } catch (error) {
          console.error(error);
        }
      });
      postsContainer.appendChild(postElement);


    });

    // Add event listeners for like buttons
    // const likeButtons = document.querySelectorAll('.like-button');
    // likeButtons.forEach(button => {  


    //   button.addEventListener('click', async (event) => {
    //   console.log(event.target)

    //     const postId = button.getAttribute('data-post-id');
    //     try {
    //       const response = await fetch(`/api/v1/posts/${postId}/like`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         }
    //       });
    //       if (!response.ok) throw new Error('Failed to toggle like');
    //       const updatedPost = await response.json();
    //       // Update like count in UI
    //       const likeCount = button.querySelector('p');
    //       likeCount.textContent = updatedPost.likes.length;
    //       // Update SVG fill color
    //       const svg = button.querySelector('svg');
    //       if (updatedPost.likes.some(userId => userId.toString() === currentUserId)) {
    //         svg.setAttribute('fill', '#0b79ee');
    //       } else {
    //         svg.setAttribute('fill', 'rgb(144 174 203)');
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   });
    // });
  }

async function createPost() {
    const content = postContentInput.value.trim();
    if (!content) return alert('Post content cannot be empty');

    const privacySelect = document.getElementById('post-privacy');
    const privacy = privacySelect ? privacySelect.value : 'Public';

    const formData = new FormData();
    formData.append('content', content);
    formData.append('privacy', privacy);

    for (const file of postImagesInput.files) {
      formData.append('images', file);
    }
    for (const file of postVideosInput.files) {
      formData.append('videos', file);
    }

    const postButton = document.getElementById('post-button');
    const progressContainer = document.getElementById('upload-progress-container');
    const progressBar = document.getElementById('upload-progress');
    const progressText = document.getElementById('upload-progress-text');

    postButton.disabled = true;
    progressContainer.classList.remove('hidden');
    progressBar.value = 0;
    progressText.textContent = 'Uploading...';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/v1/posts');

      xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          progressBar.value = percentComplete;
          progressText.textContent = `Uploading... ${percentComplete}%`;
        }
      };

      xhr.onload = function () {
        postButton.disabled = false;
        progressContainer.classList.add('hidden');
        if (xhr.status >= 200 && xhr.status < 300) {
          postContentInput.value = '';
          postImagesInput.value = '';
          postVideosInput.value = '';
          console.log(xhr.status)
          init();
          resolve();
        } else {
          progressText.textContent = 'Upload failed. Please try again.';
          reject(new Error('Failed to create post'));
        }
      };

      xhr.onerror = function () {
        postButton.disabled = false;
        progressContainer.classList.add('hidden');
        progressText.textContent = 'Upload failed. Please try again.';
        reject(new Error('Failed to create post'));
      };

      xhr.send(formData);
    });
  }

  postButton.addEventListener('click', createPost);
  // Add event delegation for comment submit buttons
  postsContainer.addEventListener('click', async (event) => {
    if (event.target.classList.contains('comment-submit')) {
      const button = event.target;
      const postElement = button.closest('div.mb-6');
      const postId = postElement.querySelector('.like-button').getAttribute('data-post-id');
      const commentInput = postElement.querySelector('.comment-input');
      const content = commentInput.value.trim();
      if (!content) return alert('Comment cannot be empty');

      try {
        const response = await fetch(`/api/v1/posts/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content })
        });
        if (!response.ok) throw new Error('Failed to add comment');
        commentInput.value = '';
        fetchPosts();
      } catch (error) {
        console.error(error);
      }
    }

    if (event.target.classList.contains('see-replies-btn')) {
      const button = event.target;
      const commentDiv = button.closest('.comment');
      const nestedRepliesContainer = commentDiv.querySelector('.nested-replies');
      const commentId = commentDiv.getAttribute('data-comment-id');
      if (!nestedRepliesContainer.hasChildNodes()) {
        // Fetch replies from backend
        try {
          const response = await fetch(`/api/v1/posts/comments/${commentId}/replies`);
          if (!response.ok) throw new Error('Failed to fetch replies');
          const replies = await response.json();
          // Render replies inside nestedRepliesContainer
          nestedRepliesContainer.innerHTML = renderComments(replies, null, 1);
          button.textContent = 'Hide replies';
        } catch (error) {
          console.error(error);
        }
      } else {
        // Toggle visibility
        if (nestedRepliesContainer.style.display === 'none' || nestedRepliesContainer.style.display === '') {
          nestedRepliesContainer.style.display = 'block';
          button.textContent = 'Hide replies';
        } else {
          nestedRepliesContainer.style.display = 'none';
          button.textContent = 'See replies (' + nestedRepliesContainer.children.length + ')';
        }
      }
    }

    if (event.target.classList.contains('reply-btn')) {
      const commentDiv = event.target.closest('.comment');
      const replyForm = commentDiv.querySelector('.reply-form');
      replyForm.classList.toggle('hidden');
      // Store the parent comment ID on the reply form element for later use
      replyForm.setAttribute('data-parent-comment-id', commentDiv.getAttribute('data-comment-id'));
    }

    if (event.target.classList.contains('reply-submit')) {
      const replyForm = event.target.closest('.reply-form');
      const replyInput = replyForm.querySelector('.reply-input');
      let content = replyInput.value.trim();
      if (!content) return alert('Reply cannot be empty');
      // Get the parent comment ID from the reply form attribute
      const commentId = replyForm.getAttribute('data-parent-comment-id');
      const postElement = event.target.closest('div.mb-6');
      const postId = postElement.querySelector('.like-button').getAttribute('data-post-id');

      // Get the username of the parent comment author to mention
      const parentCommentDiv = document.querySelector(`.comment[data-comment-id="${commentId}"]`);
      const parentAuthorName = parentCommentDiv ? parentCommentDiv.querySelector('p.text-white.font-semibold').textContent : null;

      if (parentAuthorName && !content.startsWith(`@${parentAuthorName}`)) {
        content = `@${parentAuthorName} ${content}`;
      }

      try {
        const response = await fetch(`/api/v1/posts/${postId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, parentCommentId: commentId })
        });
        if (!response.ok) throw new Error('Failed to add reply');
        replyInput.value = '';
        fetchPosts();
      } catch (error) {
        console.error(error);
      }
    }

    if (event.target.classList.contains('edit-btn')) {
      const commentDiv = event.target.closest('.comment');
      commentDiv.querySelector('.edit-form').classList.remove('hidden');
      commentDiv.querySelector('.comment-actions').classList.add('hidden');
    }

    if (event.target.classList.contains('edit-cancel')) {
      const commentDiv = event.target.closest('.comment');
      commentDiv.querySelector('.edit-form').classList.add('hidden');
      commentDiv.querySelector('.comment-actions').classList.remove('hidden');
    }


    if (event.target.classList.contains('edit-submit')) {
      const commentDiv = event.target.closest('.comment');
      const editInput = commentDiv.querySelector('.edit-input');
      const newContent = editInput.value.trim();
      const commentId = commentDiv.getAttribute('data-comment-id');
      if (!newContent) return alert('Content cannot be empty');

      try {
        const response = await fetch(`/api/v1/posts/comments/${commentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newContent })
        });
        if (!response.ok) throw new Error('Failed to edit comment');
        fetchPosts();
      } catch (error) {
        console.error(error);
      }
    }


    if (event.target.classList.contains('delete-btn')) {
      if (!confirm('Are you sure you want to delete this comment?')) return;
      const commentDiv = event.target.closest('.comment');
      const commentId = commentDiv.getAttribute('data-comment-id');
      const postElement = event.target.closest('div.mb-6');
      const postId = postElement.querySelector('.like-button').getAttribute('data-post-id');

      try {
        const response = await fetch(`/api/v1/posts/${postId}/comments/${commentId}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete comment');
        fetchPosts();
      } catch (error) {
        console.error(error);
      }
    }

    if (event.target.classList.contains('react-btn')) {
      const commentDiv = event.target.closest('.comment');
      const commentId = commentDiv.getAttribute('data-comment-id');
      const reactionType = 'like'; // For demo, only 'like' reaction is toggled

      try {
        const response = await fetch(`/api/v1/posts/comments/${commentId}/reactions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reactionType })
        });
        if (!response.ok) throw new Error('Failed to react to comment');
        fetchPosts();
      } catch (error) {
        console.error(error);
      }
    }






  });
  fetchCurrentUser().then(init);
});
