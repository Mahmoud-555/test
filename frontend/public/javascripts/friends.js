document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResultsList = document.getElementById('searchResultsList');
  const friendRequestsList = document.getElementById('friendRequestsList');
  const sentRequestsList = document.getElementById('sentRequestsList');
  const friendsListContainer = document.getElementById('friendsListContainer');
  const tabs = document.querySelectorAll('.tab');
  let friendRequests = [];
  let sentRequests = [];
  let friends = [];

  // Switch tab content
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Fetch current friends
  async function fetchFriends() {
    try {
      const res = await fetch('/api/v1/friends/friends');
      if (res.ok) {
        const data = await res.json();
        friends = data.friends;
        renderFriends();
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  }

  // Render friends list
  function renderFriends() {
    friendsListContainer.innerHTML = '';
    if (friends.length === 0) {
      friendsListContainer.innerHTML = '<p>No friends found.</p>';
      return;
    }
    friends.forEach(friend => {
      const card = createFriendCard(friend, 'friend');
      friendsListContainer.appendChild(card);
    });
  }

  // Fetch friend requests and sent requests
  async function fetchRequests() {
    try {
      const res = await fetch('/api/v1/friends/requests');
      if (res.ok) {
        const data = await res.json();
        friendRequests = data.friendRequests;
        sentRequests = data.sentFriendRequests;
        renderFriendRequests();
        renderSentRequests();
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }

  // Fetch current friends list
  async function fetchFriends() {
    try {
      const res = await fetch('/api/v1/friends/friends');
      if (res.ok) {
        const data = await res.json();
        renderFriends(data.friends);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  }

  // Render current friends list
  function renderFriends(friends) {
    const container = document.getElementById('friendsListContainer');
    container.innerHTML = '';
    if (friends.length === 0) {
      container.innerHTML = '<p>No friends found.</p>';
      return;
    }
    friends.forEach(friend => {
      const card = createFriendCard(friend, 'friend');
      container.appendChild(card);
    });
  }

  // Modify createFriendCard to handle 'friend' type (no buttons)
  function createFriendCard(user, type) {
    const card = document.createElement('div');
    card.className = 'friend-card';

    const img = document.createElement('img');
    img.src = user.profileImage || '/images/uploads/emoji-avatar-thumb-768x810.png';
    img.alt = user.name;

    const info = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = user.name;
    const username = document.createElement('p');
    username.textContent = '@' + user.username;

    info.appendChild(name);
    info.appendChild(username);

    if (type === 'request') {
      const btnAccept = document.createElement('button');
      btnAccept.className = 'friend-btn';
      btnAccept.textContent = 'Accept';
      btnAccept.addEventListener('click', () => respondToRequest(user._id, 'accepted', btnAccept, btnDecline));

      const btnDecline = document.createElement('button');
      btnDecline.className = 'friend-btn decline';
      btnDecline.textContent = 'Decline';
      btnDecline.addEventListener('click', () => respondToRequest(user._id, 'declined', btnAccept, btnDecline));

      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(btnAccept);
      card.appendChild(btnDecline);
    } else if (type === 'sent') {
      const btnCancel = document.createElement('button');
      btnCancel.className = 'friend-btn cancel';
      btnCancel.textContent = 'Cancel';
      btnCancel.addEventListener('click', () => cancelRequest(user._id, btnCancel));

      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(btnCancel);
    } else if (type === 'search') {
      const btnAdd = document.createElement('button');
      btnAdd.className = 'friend-btn';
      btnAdd.textContent = 'Add Friend';
      btnAdd.addEventListener('click', () => sendFriendRequest(user._id, btnAdd));

      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(btnAdd);
    } else if (type === 'friend') {
      // Just show friend info, no buttons
      card.appendChild(img);
      card.appendChild(info);
    }

    return card;
  }

  // Initial fetch of friend requests, sent requests, and friends list
  fetchRequests();

  // Render friend requests
  function renderFriendRequests() {
    friendRequestsList.innerHTML = '';
    if (friendRequests.length === 0) {
      friendRequestsList.innerHTML = '<p>No friend requests.</p>';
      return;
    }
    friendRequests.forEach(fr => {
      const card = createFriendCard(fr.user, 'request');
      friendRequestsList.appendChild(card);
    });
  }

  // Render sent requests
  function renderSentRequests() {
    sentRequestsList.innerHTML = '';
    if (sentRequests.length === 0) {
      sentRequestsList.innerHTML = '<p>No sent requests.</p>';
      return;
    }
    sentRequests.forEach(sr => {
      const card = createFriendCard(sr.user, 'sent');
      sentRequestsList.appendChild(card);
    });
  }

  // Create friend card element
  function createFriendCard(user, type) {
    const card = document.createElement('div');
    card.className = 'friend-card';

    const img = document.createElement('img');
    img.src = user.profileImage || '/images/uploads/emoji-avatar-thumb-768x810.png';
    img.alt = user.name;

    const info = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = user.name;
    const username = document.createElement('p');
    username.textContent = '@' + user.username;

    info.appendChild(name);
    info.appendChild(username);

    const btnAccept = document.createElement('button');
    btnAccept.className = 'friend-btn';
    btnAccept.textContent = 'Accept';

    const btnDecline = document.createElement('button');
    btnDecline.className = 'friend-btn decline';
    btnDecline.textContent = 'Decline';

    const btnCancel = document.createElement('button');
    btnCancel.className = 'friend-btn cancel';
    btnCancel.textContent = 'Cancel';

    if (type === 'friend') {
      // For current friends, show a disabled button or no button
      const btnFriend = document.createElement('button');
      btnFriend.className = 'friend-btn';
      btnFriend.textContent = 'Friend';
      btnFriend.disabled = true;
      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(btnFriend);
    } else if (type === 'request') {
      btnAccept.addEventListener('click', () => respondToRequest(user._id, 'accepted', btnAccept, btnDecline));
      btnDecline.addEventListener('click', () => respondToRequest(user._id, 'declined', btnAccept, btnDecline));
      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(btnAccept);
      card.appendChild(btnDecline);
    } else if (type === 'sent') {
      btnCancel.addEventListener('click', () => cancelRequest(user._id, btnCancel));
      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(btnCancel);
    } else if (type === 'search') {
      const btnAdd = document.createElement('button');
      btnAdd.className = 'friend-btn';
      btnAdd.textContent = 'Add Friend';
      btnAdd.addEventListener('click', () => sendFriendRequest(user._id, btnAdd));
      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(btnAdd);
    }

    return card;
  }

  // Respond to friend request
  async function respondToRequest(userId, status, btnAccept, btnDecline) {
    try {
      const res = await fetch('/api/v1/friends/friend-request-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status })
      });
      if (res.ok) {
        // Remove from friendRequests array and re-render
        friendRequests = friendRequests.filter(fr => fr.user._id !== userId);
        renderFriendRequests();
      } else {
        console.error('Failed to respond to friend request');
      }
    } catch (error) {
      console.error('Error responding to friend request:', error);
    }
  }

  // Cancel sent friend request
  async function cancelRequest(userId, btnCancel) {
    try {
      const res = await fetch('/api/v1/friends/friend-request', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId: userId })
      });
      if (res.ok) {
        // Remove from sentRequests array and re-render
        sentRequests = sentRequests.filter(sr => sr.user._id !== userId);
        renderSentRequests();
      } else {
        console.error('Failed to cancel friend request');
      }
    } catch (error) {
      console.error('Error cancelling friend request:', error);
    }
  }

  // Send friend request from search results
  async function sendFriendRequest(userId, btnAdd) {
    try {
      btnAdd.disabled = true;
      const res = await fetch('/api/v1/friends/friend-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId: userId })
      });
      if (res.ok) {
        btnAdd.textContent = 'Request Sent';
        btnAdd.disabled = true;
        // Optionally update sentRequests list
        await fetchRequests();
      } else {
        console.error('Failed to send friend request');
        btnAdd.disabled = false;
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      btnAdd.disabled = false;
    }
  }

  // Search users
  async function searchUsers(query) {
    if (!query) {
      searchResultsList.innerHTML = '';
      return;
    }
    try {
      const res = await fetch(`/api/v1/friends/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const users = await res.json();
        renderSearchResults(users);
      } else {
        console.error('Failed to search users');
      }
    } catch (error) {
      console.error('Error searching users:', error);
    }
  }

  // Render search results in a Telegram-style dropdown below always visible search input
  function renderSearchResults(users) {
    // Remove existing dropdown if any
    const existingDropdown = document.getElementById('searchResultsDropdown');
    if (existingDropdown) {
      existingDropdown.remove();
    }

    // Get the search input element
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    // Create dropdown container
    const dropdown = document.createElement('div');
    dropdown.id = 'searchResultsDropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.top = (searchInput.offsetTop + searchInput.offsetHeight) + 'px';
    dropdown.style.left = searchInput.offsetLeft + 'px';
    dropdown.style.width = searchInput.offsetWidth + 'px';
    dropdown.style.maxHeight = '300px';
    dropdown.style.overflowY = 'auto';
    dropdown.style.backgroundColor = '#fff';
    dropdown.style.border = '1px solid #ccc';
    dropdown.style.borderRadius = '8px';
    dropdown.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    dropdown.style.zIndex = '10000';

    if (users.length === 0) {
      const noResults = document.createElement('p');
      noResults.textContent = 'No users found.';
      noResults.style.padding = '10px';
      noResults.style.textAlign = 'center';
      noResults.style.color = '#777';
      dropdown.appendChild(noResults);
    } else {
      users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.style.display = 'flex';
        userDiv.style.alignItems = 'center';
        userDiv.style.padding = '8px 12px';
        userDiv.style.cursor = 'pointer';
        userDiv.style.borderBottom = '1px solid #eee';

        userDiv.addEventListener('mouseenter', () => {
          userDiv.style.backgroundColor = '#f0f0f0';
        });
        userDiv.addEventListener('mouseleave', () => {
          userDiv.style.backgroundColor = 'transparent';
        });

        const userImg = document.createElement('img');
        userImg.src = user.profileImage || '/images/uploads/emoji-avatar-thumb-768x810.png';
        userImg.alt = user.name;
        userImg.style.width = '36px';
        userImg.style.height = '36px';
        userImg.style.borderRadius = '50%';
        userImg.style.marginRight = '12px';
        userImg.style.objectFit = 'cover';

        const userInfo = document.createElement('div');
        userInfo.style.flexGrow = '1';

        const userName = document.createElement('div');
        userName.textContent = user.name;
        userName.style.fontWeight = '600';
        userName.style.color = '#222';

        const userUsername = document.createElement('div');
        userUsername.textContent = '@' + user.username;
        userUsername.style.fontSize = '12px';
        userUsername.style.color = '#666';

        userInfo.appendChild(userName);
        userInfo.appendChild(userUsername);

        const btnAdd = document.createElement('button');
        btnAdd.className = 'friend-btn';
        btnAdd.textContent = 'Add Friend';
        btnAdd.style.backgroundColor = '#0088cc';
        btnAdd.style.border = 'none';
        btnAdd.style.padding = '6px 14px';
        btnAdd.style.borderRadius = '16px';
        btnAdd.style.color = 'white';
        btnAdd.style.cursor = 'pointer';
        btnAdd.style.fontWeight = '600';
        btnAdd.style.fontSize = '13px';
        btnAdd.style.transition = 'background-color 0.3s ease';
        btnAdd.addEventListener('mouseenter', () => {
          btnAdd.style.backgroundColor = '#006699';
        });
        btnAdd.addEventListener('mouseleave', () => {
          btnAdd.style.backgroundColor = '#0088cc';
        });
        btnAdd.addEventListener('click', () => {
          sendFriendRequest(user._id, btnAdd);
        });

        userDiv.appendChild(userImg);
        userDiv.appendChild(userInfo);
        userDiv.appendChild(btnAdd);
        dropdown.appendChild(userDiv);
      });
    }

    // Append dropdown to the body
    document.body.appendChild(dropdown);

    // Position dropdown relative to search input on window resize or scroll
    function updateDropdownPosition() {
      dropdown.style.top = (searchInput.offsetTop + searchInput.offsetHeight) + 'px';
      dropdown.style.left = searchInput.offsetLeft + 'px';
      dropdown.style.width = searchInput.offsetWidth + 'px';
    }
    window.addEventListener('resize', updateDropdownPosition);
    window.addEventListener('scroll', updateDropdownPosition);
  }

  // Debounce function to limit search calls
  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const debouncedSearch = debounce((e) => {
    searchUsers(e.target.value.trim());
  }, 300);

  searchInput.addEventListener('input', debouncedSearch);

  // Initial fetch of friend requests, sent requests, and friends
  fetchRequests();
  fetchFriends();
});
