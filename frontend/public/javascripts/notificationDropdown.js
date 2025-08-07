const notificationButton = document.getElementById('notificationButton');
const notificationDropdown = document.getElementById('notificationDropdown');
const clearButton = document.getElementById('clearNotifications');

notificationButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from bubbling up to the window
    notificationDropdown.classList.toggle('show');
    const expanded = notificationDropdown.classList.contains('show');
    // Update aria-expanded attribute
    notificationDropdown.setAttribute('aria-hidden', !expanded);

    // For accessibility: focus on the dropdown when opened
    if (expanded) {
        notificationDropdown.focus();
    }
});

notificationDropdown.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from bubbling up to the window
});
// Close the dropdown when clicking outside of it
window.addEventListener('click', () => {
    notificationDropdown.classList.remove('show');
});

clearButton.addEventListener('click', async () => {
    try {
        await fetch('/api/v1/users/notifications/clear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        renderNotifications();
    } catch (error) {
        console.error('Failed to clear notifications:', error);
    }
});

// Add mark all as read button and handler
const markReadButton = document.getElementById('markReadNotifications');

if (markReadButton) {
    markReadButton.addEventListener('click', async () => {
        try {
            await fetch('/api/v1/users/notifications/read', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            renderNotifications();
        } catch (error) {
            console.error('Failed to mark notifications as read:', error);
        }
    });
}

function timeAgo(date) {
    const now = new Date();
    const seconds = (now - date) / 1000;
    let interval = Math.floor(seconds / 31536000);

    if (interval == 1) return interval + " year ago";
    if (interval > 1) return interval + " years ago";
    interval = Math.floor(seconds / 2592000);
    if (interval == 1) return interval + " month ago";
    if (interval > 1) return interval + " months ago";
    interval = Math.floor(seconds / 86400);
    if (interval == 1) return interval + " day ago";
    if (interval > 1) return interval + " days ago";
    interval = Math.floor(seconds / 3600);
    if (interval == 1) return interval + " hour ago";
    if (interval > 1) return interval + " hours ago";
    interval = Math.floor(seconds / 60);
    if (interval == 1) return interval + " minute ago";
    if (interval > 1) return interval + " minutes ago";

    interval = Math.floor(seconds / 1);
    if (interval == 1) return interval + " second ago";
    if (interval > 1) return interval + " seconds ago";
    return " Now";
}

function createNotificationBadge(type) {
    const badge = document.createElement('span');
    badge.className = 'notification-badge';
    switch (type) {
        case 'invitation':
            badge.textContent = 'Invitation';
            badge.style.backgroundColor = '#4caf50';
            badge.style.color = 'white';
            break;
        case 'friend request':
            badge.textContent = 'Friend Request';
            badge.style.backgroundColor = '#2196f3';
            badge.style.color = 'white';
            break;
        case 'info':
            badge.textContent = 'Info';
            badge.style.backgroundColor = '#ff9800';
            badge.style.color = 'white';
            break;
        case 'warning':
            badge.textContent = 'Warning';
            badge.style.backgroundColor = '#ff5722';
            badge.style.color = 'white';
            break;
        case 'error':
            badge.textContent = 'Error';
            badge.style.backgroundColor = '#f44336';
            badge.style.color = 'white';
            break;
        default:
            badge.textContent = 'Notification';
            badge.style.backgroundColor = '#ff9e00';
            badge.style.color = '#1e1e2f';
    }
    return badge;
}


function renderNotifications() {
    fetch("api/v1/users/notifications", {
        method: "get",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => {
        response.json().then((res) => {
            let notifications = res.notifications;

            // Sort by newest first
            notifications.sort((a, b) => new Date(b.time) - new Date(a.time));

            const container = document.getElementById('notificationContainer');
            container.innerHTML = ''; // Clear existing notifications

            const options = {
                hour: '2-digit',
                minute: '2-digit',
            };

            notifications.forEach(notification => {
                const t = new Date(notification.time);
                const time = t.toLocaleString(undefined, options);

                const item = document.createElement('div');
                item.className = 'notification-item';
                if (!notification.isRead) {
                    item.classList.add('unread');
                }

                const avatar = document.createElement('img');
                avatar.src = notification.avatar || '/images/default-avatar.png';
                avatar.alt = 'Avatar';
                avatar.className = 'avatar';
                item.appendChild(avatar);

                const content = document.createElement('div');
                content.className = 'notification-content';

                const message = document.createElement('p');
                message.className = 'notification-message';
                message.innerHTML = notification.message; // Allow HTML for bold names
                content.appendChild(message);

                const timeDiv = document.createElement('div');
                timeDiv.className = 'notification-time';
                timeDiv.textContent = time + ' (' + timeAgo(t) + ')';
                content.appendChild(timeDiv);

                item.appendChild(content);

                if (!notification.isRead) {
                    const unreadDot = document.createElement('div');
                    unreadDot.className = 'unread-dot';
                    item.appendChild(unreadDot);
                }

                container.appendChild(item);
            });

            // Update badge count
            const unreadCount = notifications.filter(n => !n.isRead).length;
            document.getElementById('notificationBadge').textContent = unreadCount;
        });
    }).catch((err) => { console.log(err) });
}

// Initial rendering of notifications
renderNotifications();
