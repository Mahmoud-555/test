const socket = io();

socket.on("connect", () => {
 console.log("you are online")
})
socket.on("newNotification",(notification)=>{
    console.log(notification)
    const item = document.createElement('div');
    item.className = 'notification-item';
    item.id=notification._id
    time=notification.time||"just now"
    item.innerHTML = `
<img src="${notification.avatar}" alt="Avatar" class="avatar">
<div class="notification-message">${notification.message}<a href=${notification.href}>go</a></div>
<span class="notification-time">${time}</span>
`;
document.getElementById('notificationContainer').prepend(item);

})

