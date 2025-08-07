document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedQuizzes();
  loadRecentActivity();
  loadLeaderboard();
  setupSearch();

  // Responsive navigation toggle
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      const expanded = navbarToggle.getAttribute('aria-expanded') === 'true' || false;
      navbarToggle.setAttribute('aria-expanded', !expanded);
      navbarMenu.classList.toggle('active');
    });
  }
});

// Fetch and render featured quizzes
async function loadFeaturedQuizzes() {
  try {
    const response = await fetch('/api/v1/quizzes/featured');
    if (!response.ok) throw new Error('Failed to fetch featured quizzes');
    const data = await response.json();
    const container = document.getElementById('featuredQuizzes');
    container.innerHTML = '';
    data.quizzes.forEach(quiz => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${quiz.title}</h5>
            <p class="card-text flex-grow-1">${quiz.description || ''}</p>
            <a href="/quiz/${quiz._id}" class="btn btn-primary mt-auto">Start Quiz</a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  } catch (error) {
    console.error(error);
  }
}

// Fetch and render recent activity and user stats
async function loadRecentActivity() {
  try {
    const response = await fetch('/api/v1/users/activity');
    if (!response.ok) throw new Error('Failed to fetch recent activity');
    const data = await response.json();
    const container = document.getElementById('recentActivity');
    container.innerHTML = '';
    if (data.activities && data.activities.length > 0) {
      const ul = document.createElement('ul');
      ul.className = 'list-group';
      data.activities.forEach(activity => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${activity.user} ${activity.action} ${activity.target} - ${new Date(activity.time).toLocaleString()}`;
        ul.appendChild(li);
      });
      container.appendChild(ul);
    } else {
      container.textContent = 'No recent activity.';
    }
  } catch (error) {
    console.error(error);
  }
}

// Fetch and render leaderboard
async function loadLeaderboard() {
  try {
    const response = await fetch('/api/v1/leaderboard');
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    const data = await response.json();
    const container = document.getElementById('leaderboard');
    container.innerHTML = '';
    data.leaderboard.forEach((user, index) => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="leaderboard-card">
          <div class="rank-badge">#${index + 1}</div>
          <div class="player-info">
            <img src="${user.profileImage || '/images/default-avatar.png'}" alt="${user.username}" class="player-avatar" />
            <h3 class="player-name">${user.username}</h3>
            <p class="player-score">${user.score} points</p>
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: ${Math.min(user.score, 100)}%;"></div>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  } catch (error) {
    console.error(error);
  }
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchResults = document.getElementById('searchResults');

  searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) {
      searchResults.innerHTML = '<p>Please enter a search term.</p>';
      return;
    }
    try {
      const response = await fetch(`/api/v1/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      renderSearchResults(data);
    } catch (error) {
      console.error(error);
      searchResults.innerHTML = '<p>Error occurred during search.</p>';
    }
  });

  function renderSearchResults(data) {
    searchResults.innerHTML = '';
    if ((!data.quizzes || data.quizzes.length === 0) && (!data.users || data.users.length === 0)) {
      searchResults.innerHTML = '<p>No results found.</p>';
      return;
    }
    if (data.quizzes && data.quizzes.length > 0) {
      const quizHeader = document.createElement('h5');
      quizHeader.textContent = 'Quizzes';
      searchResults.appendChild(quizHeader);
      const ul = document.createElement('ul');
      ul.className = 'list-group mb-3';
      data.quizzes.forEach(quiz => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<a href="/quiz/${quiz._id}">${quiz.title}</a>`;
        ul.appendChild(li);
      });
      searchResults.appendChild(ul);
    }
    if (data.users && data.users.length > 0) {
      const userHeader = document.createElement('h5');
      userHeader.textContent = 'Users';
      searchResults.appendChild(userHeader);
      const ul = document.createElement('ul');
      ul.className = 'list-group';
      data.users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<a href="/profile/${user._id}">${user.username}</a>`;
        ul.appendChild(li);
      });
      searchResults.appendChild(ul);
    }
  }
}
