const socket = io();

socket.on("connect", () => {
 console.log("you are online")
})
socket.on("newNotification",(notification)=>{
    console.log(notification)
    const item = document.createElement('div');
    item.className = 'notification-item';
    item.id=notification._id

    const options = {
        // weekday: 'long',
        // year: 'numeric',
        // month: 'numeric',
        // day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // hour12: false
    };
    const t = new Date(notification.time)

    const time = t.toLocaleString('en-US', options)
    
    item.innerHTML = `
// <img src="${notification.avatar}" alt="Avatar" class="avatar">
// <div class="notification-message">${notification.message}<a href=${notification.href}>go</a></div>
// <span class="notification-time">${time}</span>
// `;
if (notification.type === "invitation") {

    item.innerHTML = `

<div>
<img src="${notification.avatar}" alt="Avatar" class="avatar">
</div>

<div style="flex-grow: 1;">

<div class="notification-message">${notification.message}</div>
<div class="notification-time">
 <span class="notification-time">${time}</span> 
 <span class="notification-time">${timeAgo(t)}</span> 
</div>


<div class="action-div">



<a  class=" btn btn-primary btn-sm" href=${notification.href}>
Start
</a> 

</div>




</div>
`;

}
else if (notification.type === "friend request") {

    item.innerHTML = `
<div>
<img src="${notification.avatar}" alt="Avatar" class="avatar">
</div>

<div style="flex-grow: 1;">

<div class="notification-message">${notification.message}</div>
<div class="notification-time">
 <span class="notification-time">${time}</span> 
 <span class="notification-time">${timeAgo(t)}</span> 


</div>


<div class="action-div">

<button id="decline" class=" btn btn-outline-dark btn-sm" href=${notification.href}> Decline </button> 
<button id="accept" class=" btn btn-primary btn-sm" href=${notification.href}> Accept </button> 

</div>


</div>
`

    item.querySelector("#decline").addEventListener("click", async () => {

        const res = await fetch(`/api/v1/friends/friend-request-response`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "userId": notification.from, status: "declined" })
        });
        if (res.ok) {
            removeWithFade(item);
            for (let index = 0; index < item.querySelector(".action-div").getElementsByTagName("button").length; index++) {
                item.querySelector(".action-div").getElementsByTagName("button")[index].disabled=true;

            }
       
        }




    })

    item.querySelector("#accept").addEventListener("click", async () => {

        const res = await fetch(`/api/v1/friends/friend-request-response`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "userId": notification.from, status: "accepted" })
        });
        if (res.ok) {
            removeWithFade(item);
            for (let index = 0; index < item.querySelector(".action-div").getElementsByTagName("button").length; index++) {
                item.querySelector(".action-div").getElementsByTagName("button")[index].disabled=true;

            }
       
        }




    })

}

document.getElementById('notificationContainer').prepend(item);

})

