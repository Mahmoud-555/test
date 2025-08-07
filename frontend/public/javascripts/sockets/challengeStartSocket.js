const socket = io();
// const myId = localStorage.getItem("myId")




socket.on("connect", () => {
  setTimeout(() => {
    socket.emit("ready", Id, (res) => {
      console.log(res)
      if (res.status == "join") {
        document.getElementById("start").innerText = "Join"
      }
      if (res.status == "joined") {

        document.getElementById("ready-section").style.display = "none"
        document.getElementById("timerContair").style.display = "none"
        document.getElementById("main-header").style.display = "none"
        document.getElementById("competition").style.display = "flex"
      } else {
        document.getElementById("start").style.display = "flex"
        document.getElementById("ready-section").style.display = "block"
        document.getElementById("main-header").style.display = "flex"

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
socket.on("newQuestion", (question, timeRemaining, questionNum, competitionLength) => {
  console.log(question)
  document.getElementById("ready-section").style.display = "none"
  document.getElementById("timerContair").style.display = "none"
  document.getElementById("main-header").style.display = "none"
  document.getElementById("competition").style.display = "flex"

  buildQuiz(question, timeRemaining, questionNum, competitionLength)
})
socket.on("updateScore", (leaderBoard) => {
  let myRank = leaderBoard.find(user => user._id === userId);
  // console.log(myId,leaderBoard,myRank)
  document.getElementById("score").innerText = myRank.score
  // document.getElementById("rank").innerText = indexToOrdinal(leaderBoard.indexOf(myRank))
  updateLeaderboardWithNewData(leaderBoard)



})
socket.on("questionResult", (questionResult) => {
  showResults(questionResult)
})


function buildQuiz(data, timeRemaining, questionNum, competitionLength) {
  const quizContainer = document.getElementById('quiz');
  const questionNumDiv = document.getElementById('questionNum');
  console.log(data)
  const currentQuestion = data
  currentQuestion.duration = currentQuestion.duration || 5; // الوقت بالثواني (10 دقائق)
  optionNumber = ["A", "B", "C", "D", "E", "F"]
  const answers = currentQuestion.answers.map((answer, index) =>
    `<button class="answer-button active" value="${answer}">
     <div class="option-number">${optionNumber[index]}</div>
                            <div>${answer}</div>
    
    
    </button>`
  ).join('');

  quizContainer.innerHTML = `
   <p style="font-size:12px;padding:8px 0px;color: #00000075;" id="questionNum">
        ${questionNum}/${competitionLength} Q
      </p> 

<div id=${currentQuestion._id} class="question">${currentQuestion.question}</div>
<div  class="answers">${answers}</div>
`;



  questionNumDiv.innerHTML = `${questionNum}/${competitionLength} Q`
  questionTimer(currentQuestion.duration, timeRemaining)



}
function showResults(res) {
  if (document.getElementById(res._id)) {
    if (document.getElementsByClassName("selected")[0]) {
      document.getElementsByClassName("selected")[0].classList.remove("selected")

    }

    for (let index = 0; index < document.getElementsByClassName("answer-button").length; index++) {
      let element = document.getElementsByClassName("answer-button")[index];
      element.classList.remove('active')

      console.log(index)
      if (element.value === res.correct[0]) {
        element.classList += ' correct';

      }

      if (element.value === res.userAnswer) {
        element.classList += ' selected-answer'; // للأزرار المحددة
      }
      if (res.userAnswer !==
        res.correct[0] && res.userAnswer === element.value) {
        element.classList += ' incorrect'; // للأزرار غير الصحيحة
      }
    }

  } else {
    const resultsContainer = document.getElementById('quiz');
    const userAnswer = res.userAnswer;
    const resultItem = document.createElement('div');

    const answerButtons = res.answers.map(answer => {
      let buttonClass = 'answer-button';
      console.log(res.correct)
      if (answer === res.correct[0]) {
        buttonClass += ' correct';
      }
      if (userAnswer === answer) {
        buttonClass += ' selected-answer'; // للأزرار المحددة
      }
      if (userAnswer !==
        res.correct[0] && userAnswer === answer) {
        buttonClass += ' incorrect'; // للأزرار غير الصحيحة
      }
      return `<button class="${buttonClass}" disabled>${answer}</button>`;
    }).join('');
    resultItem.classList = "results-container"
    resultItem.innerHTML = `
<div class="question">${res.question}</div>
<div class="answers">${answerButtons}</div>`;
    resultsContainer.innerHTML = "";
    resultsContainer.appendChild(resultItem);
    // scoreElement.innerHTML = `لقد حصلت على <strong>${score}</strong> من <strong>${res.testAnswers.length}</strong> أسئلة صحيحة!`;
    resultsContainer.style.display = 'block';

  }
}



function selectAnswer(event) {
  if (event.target.classList.contains('answer-button') & event.target.classList.contains('active')) {

    // navigator.vibrate(50); // Vibrate for 100 milliseconds

    // إزالة التحديد من جميع الأزرار
    document.querySelectorAll('.answer-button').forEach((button) => {
      button.classList.remove('selected')
      button.classList.remove('active')
    });

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

  } else if (event.innerText == "Join") {
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
      document.getElementById("competition").style.display = "flex"

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



// function questionTimer(duration, timeRemaining) {
//   clearInterval(timerInterval);

//   timerElement = document.getElementById("questionTimer")
//   // let timeRemaining = duration
//   // const minutes = Math.floor(timeRemaining / 60);
//   // const seconds = timeRemaining % 60;
//   // timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   timerElement.textContent = `${timeRemaining}`;
//   console.log(timerElement.textContent)

//   drawTimerCircle(timeRemaining, duration);

//   timeRemaining--;

//   timerInterval = setInterval(() => {
//     const minutes = Math.floor(timeRemaining / 60);
//     const seconds = timeRemaining % 60;
//     // timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     timerElement.textContent = `${timeRemaining}`;

//     console.log(timerElement.textContent)

//     drawTimerCircle(timeRemaining, duration);

//     timeRemaining--;

//     if (timeRemaining < 0) {
//       clearInterval(timerInterval);
//       // showResults();
//     }
//   }, 1000);
// }

function indexToOrdinal(index) {
  // Ensure the index is zero-based
  const ordinalIndex = index + 1;

  const lastDigit = ordinalIndex % 10;
  const lastTwoDigits = ordinalIndex % 100;

  let suffix = '';

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    suffix = 'th'; // Special case for 11, 12, 13
  } else {
    switch (lastDigit) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
        break;
    }
  }

  return ordinalIndex + suffix;
}











// Functions

function questionTimer(duration, timeRemaining) {
  clearInterval(timerInterval);

  timeLeft = timeRemaining;
  updateTimerDisplay(duration, timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(duration, timeLeft);

    if (timeLeft <= 0) {
      console.log(";;;;;;;")
      console.log(timerInterval)
      clearInterval(timerInterval);
      // if (!selectedOption) {
      //   // Auto-select a random option if time runs out
      //   const randomIndex = Math.floor(Math.random() * options.length);
      //   options[randomIndex].classList.add('selected');
      //   selectedOption = options[randomIndex];
      //   checkAnswer();
      // }
    }
  }, 1000);
}

function updateTimerDisplay(duration, timeLeft) {
  const timerElement = document.getElementById('timer');
  const progressElement = document.getElementById('progress');

  timerElement.textContent = timeLeft;
  const percentage = (timeLeft / duration) * 100;
  progressElement.style.width = `${percentage}%`;

  // Change color based on time left
  if (timeLeft <= 10) {
    timerElement.style.color = '#f94144';
  } else {
    timerElement.style.color = '#4361ee';
  }
}

// Add this function to handle incoming player data with rank change tracking
function updateLeaderboardWithNewData(playersData) {

  // Create a map to store all players including current user
  const allPlayers = new Map();

  // Add current user (you) with existing score
  const scoreElement = document.getElementById('score');

  // allPlayers.set("you", {
  //   username: "You",
  //   score: parseInt(scoreElement.textContent),
  //   avatar: "Y", // Default avatar for current user
  //   isCurrentUser: true
  // });

  // Add friends from the received data
  playersData.forEach(player => {

    if (player._id == userId) {
      allPlayers.set(player.username, {
        username: player.username,
        score: player.score,
        avatar: player.avatar,
        isCurrentUser: true
      });
    } else {
      allPlayers.set(player.username, {
        username: player.username,
        score: player.score,
        avatar: player.avatar,
        isCurrentUser: false
      });
    }

  });

  // Get previous ranks for comparison
  const previousRanks = new Map();
  document.querySelectorAll('.friend').forEach(friend => {
    const username = friend.querySelector('.friend-name').textContent;
    const rank = parseInt(friend.getAttribute('data-rank'));
    previousRanks.set(username, rank);
  });

  // Convert to array and sort by score (descending)
  const sortedPlayers = Array.from(allPlayers.entries())
    .sort((a, b) => b[1].score - a[1].score);

  // Clear existing friends list
  const friendsList = document.querySelector('.friends-list');
  friendsList.innerHTML = '';

  // Add sorted players to the leaderboard
  sortedPlayers.forEach((player, index) => {
    const playerData = player[1];
    const rank = index + 1;
    const username = playerData.username;

    // Get previous rank for this player
    const previousRank = previousRanks.get(username) || rank;
    const rankDifference = previousRank - rank; // Positive means moving up

    // Create friend element
    const friendElement = document.createElement('div');
    friendElement.className = `friend ${playerData.isCurrentUser ? 'active' : ''}`;
    friendElement.setAttribute('data-rank', rank);

    // Determine rank badge class
    const rankBadgeClass = rank <= 3 ? `rank-${rank}` : 'rank-other';

    // Determine status based on score
    let statusClass = 'status-waiting';
    let statusText = 'Waiting';

    if (playerData.isCurrentUser) {
      statusClass = 'status-answering';
      statusText = 'Answering';
    } else if (playerData.score > 0) {
      statusClass = 'status-completed';
      statusText = 'Completed';
    }

    // Get avatar initial or use provided avatar
    const avatarContent = playerData.avatar.startsWith('http') ||
      playerData.avatar.startsWith('/images')
      ? `<img src="${playerData.avatar}" alt="${playerData.username}" class="avatar-img">`
      : playerData.avatar.charAt(0).toUpperCase();

    // Set HTML content
    friendElement.innerHTML = `
            <div class="friend-avatar">${avatarContent}</div>
            <div class="friend-info">
                <div class="friend-name">${playerData.username}</div>
                <div class="friend-score">Score: <span>${playerData.score}</span></div>
            </div>
            <div class="friend-status ${statusClass}">${statusText}</div>
            <div class="rank-badge ${rankBadgeClass}">${rank}</div>
            <div class="rank-change">${rankDifference !== 0 ? (rankDifference > 0 ? '+' + rankDifference : rankDifference) : '+0'}</div>
        `;

    // Add to friends list
    friendsList.appendChild(friendElement);

    // Show rank change animation if rank changed
    if (rankDifference !== 0) {
      setTimeout(() => {
        const rankChangeElement = friendElement.querySelector('.rank-change');
        rankChangeElement.classList.add(rankDifference > 0 ? 'rank-up' : 'rank-down', 'show');

        // Hide rank change after animation
        setTimeout(() => {
          rankChangeElement.classList.remove('show');
        }, 2000);
      }, 100); // Small delay to allow DOM to settle
    }
  });

  // Show toast notification
  showToast('Leaderboard updated!', 'info');
}





function getToastIcon(type) {
  switch (type) {
    case 'success': return 'fa-check-circle';
    case 'error': return 'fa-exclamation-circle';
    case 'warning': return 'fa-exclamation-triangle';
    case 'info': return 'fa-info-circle';
    default: return 'fa-info-circle';
  }
}

function showToast(message, type) {
  const toastContainer = document.getElementById('toast-container');

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
                    <div class="toast-content">
                        <i class="fas ${getToastIcon(type)} toast-icon"></i>
                        <span class="toast-message">${message}</span>
                    </div>
                `;

  // Add to document
  toastContainer.appendChild(toast);

  // Set timeout to remove
  setTimeout(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, 3000);
  }, 100);
}




// Handle visibility change
// document.addEventListener('visibilitychange', handleVisibilityChange);


// Add this new function
function handleVisibilityChange() {
  if (document.hidden) {
    // Page is hidden (laptop sleep, tab switch, etc.)
    isPaused = true;
    pausedTime = Date.now();
    clearInterval(window.timerInterval);
    console.log(pausedTime);

    showToast('Timer paused', 'info');
  } else {
    // Page is visible again
    if (isPaused) {
      const timePaused = Math.floor((Date.now() - pausedTime) / 1000);
      console.log(timePaused)
      // timeLeft = Math.max(0, timeLeft - timePaused);
      isPaused = false;
      // updateTimerDisplay();
      // startTimer(); // Restart the timer with adjusted time
      showToast(`Resumed after ${timePaused}s`, 'info');
    }
  }
}