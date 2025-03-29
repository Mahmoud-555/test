const socket = io();


socket.on("connect", () => {
  setTimeout(() => {
    socket.emit("ready", Id, (res) => {
      console.log(res)
      if (res.status == "join") {
        document.getElementById("start").innerText="Join"
      }

    })

  }, 100);
}
)
socket.on('Ready user', ((data, msg) => {
  console.log(data, msg)


  if (msg === "disconnected") {
    if (document.getElementById(`${data}`)) {
      document.getElementById(`${data}`).remove()
    }

  }


  if (msg === "connected") {

    const readyUsers = document.getElementById('readyUsers');

    const readyUserDiv = document.createElement('div');
    readyUserDiv.className = 'ReadyUser';
    readyUserDiv.id = data._id;
    readyUserDiv.style = "display: flex;justify-content: flex-start;align-items: center;flex-grow: 0;flex-shrink: 0;position: relative;/* gap: 4px; */flex-direction: column;"

    // onlineFriendDiv.addEventListener("click", () => {
    //   invitedUsers.push(data.username)
    //   onlineFriendDiv.style.display = "none"
    //   const invitedUserDiv = document.createElement('div');
    //   invitedUserDiv.className = 'invitedUser';
    //   invitedUserDiv.id = "in_" + data._id;
    //   invitedUserDiv.style = "display: flex;justify-content: flex-start;align-items: center;flex-grow: 0;flex-shrink: 0;position: relative;/* gap: 4px; */flex-direction: column;"


    //   invitedUserDiv.innerHTML = `
    //   <div class="gradient-circle">

    //         <div style="display: flex;border-radius: 50%; overflow: hidden; align-items: center;justify-content: center; height: 100%;">

    //           <img style="height: 43px;width: 43px;" src="${data.profileImage}">
    //         </div>
    //            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 17px; height: 17px;position: absolute;
    //            top: -7px;
    // left: 31px;cursor: pointer;" preserveAspectRatio="xMidYMid meet">
    //       <path
    //         d="M4.95825 14.875C4.56867 14.875 4.23516 14.7363 3.95773 14.4589C3.6803 14.1814 3.54159 13.8479 3.54159 13.4583V4.25H2.83325V2.83333H6.37492V2.125H10.6249V2.83333H14.1666V4.25H13.4583V13.4583C13.4583 13.8479 13.3195 14.1814 13.0421 14.4589C12.7647 14.7363 12.4312 14.875 12.0416 14.875H4.95825ZM12.0416 4.25H4.95825V13.4583H12.0416V4.25ZM6.37492 12.0417H7.79159V5.66667H6.37492V12.0417ZM9.20825 12.0417H10.6249V5.66667H9.20825V12.0417Z"
    //         fill="#FF002E"></path>
    //     </svg>
    //   </div>

    //       <p
    //         style="width: 60px; height: 17px;padding: 4px 0;font-size: 12px; font-weight: 900; font-style: italic; text-align: left; color: #fff;">
    //         ${data.username}
    //       </p>

    // `;
    //   invitedUserDiv.querySelector("svg").addEventListener("click",
    //     () => {
    //       // item = document.getElementById("i" + onlineFriend._id)
    //       invitedUserDiv.remove()
    //       invitedUsers.splice(invitedUsers.indexOf(data.username), 1)

    //       // document.getElementById("invitedUsers").removeChild(item);
    //       // document.getElementById("sourceBox").appendChild(item);
    //       if (document.getElementById(onlineFriendDiv.id)) {
    //         document.getElementById(onlineFriendDiv.id).style.display = "flex"

    //       }

    //     }
    //   )



    //   document.getElementById("invitedUsers").appendChild(invitedUserDiv);


    // })
    readyUserDiv.innerHTML = `
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
      readyUsers.appendChild(readyUserDiv);

    }






  }

  // update ready users number
  document.getElementById("readyUsersNum").innerHTML = document.getElementsByClassName("ReadyUser").length
}));
socket.on("competitionStartAt", (startAt) => {
  socket.emit("join competition", Id)
  document.getElementById("ready-section").style.display = "none"
  document.getElementById("timerContair").style.display = "flex"
  startAt = new Date(startAt)
  console.log(startAt)

  const startAfter = (startAt - Date.now()) / 1000
  console.log(Math.round(startAfter))

  startTimer(Math.round(startAfter))

})
socket.on("newQuestion", (question,timeRemaining, questionNum, competitionLength) => {
  console.log(question)
  document.getElementById("ready-section").style.display = "none"
  document.getElementById("timerContair").style.display = "none"
  document.getElementById("main-header").style.display = "none"
  document.getElementById("competition").style.display = "block"

  buildQuiz(question,timeRemaining, questionNum, competitionLength)
})

socket.on("result",(result)=>{
  

})








function buildQuiz(data,timeRemaining, questionNum, competitionLength) {
  const quizContainer = document.getElementById('quiz');
  const questionNumDiv = document.getElementById('questionNum');
  console.log(data)
  const currentQuestion = data
  currentQuestion.duration = currentQuestion.duration || 5; // الوقت بالثواني (10 دقائق)

  const answers = currentQuestion.answers.map(answer =>
    `<button class="answer-button" value="${answer}">${answer}</button>`
  ).join('');

  quizContainer.innerHTML = `
   <p style="font-size:12px;padding:8px 0px;color: #00000075;" id="questionNum">
        ${questionNum}/${competitionLength} Q
      </p> 

<div id=${currentQuestion._id} class="question">${currentQuestion.question}</div>
<div  class="answers">${answers}</div>
`;



  questionNumDiv.innerHTML = `${questionNum}/${competitionLength} Q`
  questionTimer(currentQuestion.duration,timeRemaining)



}

function selectAnswer(event) {
  if (event.target.classList.contains('answer-button')) {
    // إزالة التحديد من جميع الأزرار
    document.querySelectorAll('.answer-button').forEach(button => button.classList.remove('selected'));

    // إضافة التحديد إلى الزر الذي تم اختياره
    event.target.classList.add('selected');

    let userAnswer = {}
    userAnswer[document.getElementsByClassName("question")[0].id] = event.target.value;


    socket.emit("answer", Id, userAnswer, (res) => {
      console.log(res)

    })



  }
}



async function start(event) {
  if (event.innerText == "Start") {
    console.log(Id)
    socket.emit("start competition", { Id }, (res) => {
      console.log(res)

    })

  } else if(event.innerText == "Join") {
    socket.emit("join competition", Id)

    console.log("event")

  }




}

function startTimer(time) {
  console.log(time)

  document.getElementById(`startTimer`).innerHTML =
    `<p class="num">${time}</p>`
  document.getElementsByClassName("num")[0].style.display = "block"

  const myInterval = setInterval(() => {
    if (time <= 1) {
      // window.location.href=`${Id}/start`
      clearInterval(myInterval)

      document.getElementById("timerContair").style.display = "none"
      document.getElementById("main-header").style.display = "none"
      document.getElementById("competition").style.display = "block"

    }

    document.getElementById(`startTimer`).innerHTML = `
    <p class="num" >
      ${time - 1}
    </p>
    `

    document.getElementsByClassName("num")[0].style.display = "block"

    time--
  }, 1000);
}

function questionTimer(duration,timeRemaining) {
  clearInterval(timerInterval);

  timerElement = document.getElementById("questionTimer")
  // let timeRemaining = duration
  // const minutes = Math.floor(timeRemaining / 60);
  // const seconds = timeRemaining % 60;
  // timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  timerElement.textContent = `${timeRemaining}`;
  console.log(timerElement.textContent)

  drawTimerCircle(timeRemaining, duration);

  timeRemaining--;

  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    // timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerElement.textContent = `${timeRemaining}`;

    console.log(timerElement.textContent)

    drawTimerCircle(timeRemaining, duration);

    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(timerInterval);
      // showResults();
    }
  }, 1000);
}

