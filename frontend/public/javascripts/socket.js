const socket = io();
const invitedUsers = []

socket.on("connect", () => {
  setTimeout(() => {
    socket.emit("getOnlineFriends")

  }, 200);


})
socket.on('updateFriendList', (onlineFriends => {
  // console.log(onlineFriends)


  const onlineUsers = document.getElementById('onlineUsers');

  onlineUsers.innerHTML = ""
  for (const onlineFriend of onlineFriends) {

    const onlineFriendDiv = document.createElement('div');
    onlineFriendDiv.className = 'onlineFriend';
    onlineFriendDiv.id = onlineFriend._id;
    onlineFriendDiv.style = "display: flex;justify-content: flex-start;align-items: center;flex-grow: 0;flex-shrink: 0;position: relative;/* gap: 4px; */flex-direction: column;"
    if (invitedUsers.includes(onlineFriend.username)) {
      onlineFriendDiv.style.display = "none"
    }
    onlineFriendDiv.addEventListener("click", () => {
      invitedUsers.push(onlineFriend.username)
      onlineFriendDiv.style.display = "none"
      const invitedUserDiv = document.createElement('div');
      invitedUserDiv.className = 'invitedUser';
      invitedUserDiv.id = "in_" + onlineFriend._id;
      invitedUserDiv.style = "display: flex;justify-content: flex-start;align-items: center;flex-grow: 0;flex-shrink: 0;position: relative;/* gap: 4px; */flex-direction: column;"

      invitedUserDiv.innerHTML = `
      <div class="gradient-circle">
          
            <div style="display: flex;border-radius: 50%; overflow: hidden; align-items: center;justify-content: center; height: 100%;">
           
              <img style="height: 43px;width: 43px;" src="${onlineFriend.profileImage}">
            </div>
               <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 17px; height: 17px;position: absolute;
               top: -7px;
    left: 31px;cursor: pointer;" preserveAspectRatio="xMidYMid meet">
          <path
            d="M4.95825 14.875C4.56867 14.875 4.23516 14.7363 3.95773 14.4589C3.6803 14.1814 3.54159 13.8479 3.54159 13.4583V4.25H2.83325V2.83333H6.37492V2.125H10.6249V2.83333H14.1666V4.25H13.4583V13.4583C13.4583 13.8479 13.3195 14.1814 13.0421 14.4589C12.7647 14.7363 12.4312 14.875 12.0416 14.875H4.95825ZM12.0416 4.25H4.95825V13.4583H12.0416V4.25ZM6.37492 12.0417H7.79159V5.66667H6.37492V12.0417ZM9.20825 12.0417H10.6249V5.66667H9.20825V12.0417Z"
            fill="#FF002E"></path>
        </svg>
      </div>
         
          <p
            style="width: 60px; height: 17px;padding: 4px 0;font-size: 12px; font-weight: 900; font-style: italic; text-align: left; color: #fff;">
            ${onlineFriend.username}
          </p>
        
    `;
      invitedUserDiv.querySelector("svg").addEventListener("click",
        () => {
          // item = document.getElementById("i" + onlineFriend._id)
          invitedUserDiv.remove()
          invitedUsers.splice(invitedUsers.indexOf(onlineFriend.username), 1)

          // document.getElementById("invitedUsers").removeChild(item);
          // document.getElementById("sourceBox").appendChild(item);

          if (document.getElementById(onlineFriendDiv.id)) {
            document.getElementById(onlineFriendDiv.id).style.display = "flex"
          }


        }
      )



      document.getElementById("invitedUsers").appendChild(invitedUserDiv);


    })
    onlineFriendDiv.innerHTML = `
    <div class="gradient-circle" style="cursor:pointer">
          <div style="display: flex;border-radius: 50%; overflow: hidden; align-items: center;justify-content: center; height: 100%;">
            <div style="height: 10px; width: 10px;background-color: greenyellow;position: absolute;top: 0;left: 32px;border-radius: 50%;">
            </div>
            <img style="height: 43px;width: 43px;" src="${onlineFriend.profileImage}">
          </div>
    </div>
       
        <p
          style="width: 60px; height: 17px;padding: 4px 0;font-size: 12px; font-weight: 900; font-style: italic; text-align: left; color: #fff;">
          ${onlineFriend.username}
        </p>
  `;
    onlineUsers.appendChild(onlineFriendDiv);



  }

}));
socket.on('friendStatusUpdate', ((data, msg) => {
  console.log(data, msg)

  if (msg === "disconnected") {
    if (document.getElementById(`${data}`)) {
      document.getElementById(`${data}`).remove()
    }

  }


  if (msg === "connected") {

    const onlineUsers = document.getElementById('onlineUsers');

    const onlineFriendDiv = document.createElement('div');
    onlineFriendDiv.className = 'onlineFriend';
    onlineFriendDiv.id = data._id;
    onlineFriendDiv.style = "display: flex;justify-content: flex-start;align-items: center;flex-grow: 0;flex-shrink: 0;position: relative;/* gap: 4px; */flex-direction: column;"
    if (invitedUsers.includes(data.username)) {
      onlineFriendDiv.style.display = "none"
    }

    onlineFriendDiv.addEventListener("click", () => {
      invitedUsers.push(data.username)
      onlineFriendDiv.style.display = "none"
      const invitedUserDiv = document.createElement('div');
      invitedUserDiv.className = 'invitedUser';
      invitedUserDiv.id = "in_" + data._id;
      invitedUserDiv.style = "display: flex;justify-content: flex-start;align-items: center;flex-grow: 0;flex-shrink: 0;position: relative;/* gap: 4px; */flex-direction: column;"


      invitedUserDiv.innerHTML = `
      <div class="gradient-circle">
          
            <div style="display: flex;border-radius: 50%; overflow: hidden; align-items: center;justify-content: center; height: 100%;">
           
              <img style="height: 43px;width: 43px;" src="${data.profileImage}">
            </div>
               <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 17px; height: 17px;position: absolute;
               top: -7px;
    left: 31px;cursor: pointer;" preserveAspectRatio="xMidYMid meet">
          <path
            d="M4.95825 14.875C4.56867 14.875 4.23516 14.7363 3.95773 14.4589C3.6803 14.1814 3.54159 13.8479 3.54159 13.4583V4.25H2.83325V2.83333H6.37492V2.125H10.6249V2.83333H14.1666V4.25H13.4583V13.4583C13.4583 13.8479 13.3195 14.1814 13.0421 14.4589C12.7647 14.7363 12.4312 14.875 12.0416 14.875H4.95825ZM12.0416 4.25H4.95825V13.4583H12.0416V4.25ZM6.37492 12.0417H7.79159V5.66667H6.37492V12.0417ZM9.20825 12.0417H10.6249V5.66667H9.20825V12.0417Z"
            fill="#FF002E"></path>
        </svg>
      </div>
         
          <p
            style="width: 60px; height: 17px;padding: 4px 0;font-size: 12px; font-weight: 900; font-style: italic; text-align: left; color: #fff;">
            ${data.username}
          </p>
        
    `;
      invitedUserDiv.querySelector("svg").addEventListener("click",
        () => {
          // item = document.getElementById("i" + onlineFriend._id)
          invitedUserDiv.remove()
          invitedUsers.splice(invitedUsers.indexOf(data.username), 1)

          // document.getElementById("invitedUsers").removeChild(item);
          // document.getElementById("sourceBox").appendChild(item);
          if (document.getElementById(onlineFriendDiv.id)) {
            document.getElementById(onlineFriendDiv.id).style.display = "flex"

          }

        }
      )



      document.getElementById("invitedUsers").appendChild(invitedUserDiv);


    })
    onlineFriendDiv.innerHTML = `
    <div class="gradient-circle" style="cursor:pointer">
          <div style="display: flex;border-radius: 50%; overflow: hidden; align-items: center;justify-content: center; height: 100%;">
            <div style="height: 10px; width: 10px;background-color: greenyellow;position: absolute;top: 0;left: 32px;border-radius: 50%;">
            </div>
            <img style="height: 43px;width: 43px;" src="${data.profileImage}">
          </div>
    </div>
       
        <p
          style="width: 60px; height: 17px;padding: 4px 0;font-size: 12px; font-weight: 900; font-style: italic; text-align: left; color: #fff;">
          ${data.username}
        </p>
  `;
  if (!document.getElementById(data._id)) {
        onlineUsers.appendChild(onlineFriendDiv);

  }



  
  








  }
}));


async function inviteUsers() {
if (invitedUsers[0]) {
       socket.emit("inviteUsers",invitedUsers)

}else{
  document.location.href = document.getElementById("invLink").innerText
}



}

