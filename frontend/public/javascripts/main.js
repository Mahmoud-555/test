

function getUserData() {

   fetch("users/userdata", {
      method: "get",
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
      // body: JSON.stringify({ email: email, password: password })
   }).then((response) => {
      response.json().then((userData) => {
         // localStorage.setItem('userData', JSON.stringify(userData));


         if (userData) {
            if (userData.profileImage) {
               // document.getElementById("account").innerHTML = '  <button class="profile-data"><div class="profile-img"></div>         <i class="fa-solid fa-caret-down"></i>                    </button>'
               document.getElementById("profile-img").src = userData.profileImage
               // document.querySelector(".profile-img img").src = userData.profileImage;


            }

         }




         console.log(userData);

      }
      )
   }).catch((err) => { console.log(err) })

}


document.addEventListener('DOMContentLoaded', function () {

   getUserData()


  
});


































































































































































// routering
let views = {
   "/login": loginView,
   "/signUp": signUpView,
   "/forgot-password": forgotPasswordView,

}


let view = location.pathname
document.getElementsByClassName("main")[0].innerHTML = views[view]

window.addEventListener('popstate', function (e) {
   view = location.pathname
   setTimeout(() => {
      document.getElementsByClassName("main")[0].innerHTML = views[view]

   }, 250);
   console.log(view);
});

document.body.addEventListener("click", e => {
   if (e.target.classList.contains("data-link")) {

      e.preventDefault();
      navigateTo(e.target.href);
      view = location.pathname
      setTimeout(() => {
         document.getElementsByClassName("main")[0].innerHTML = views[view]

      }, 250);

   } else if (e.target.parentElement.classList.contains("data-link")) {

      e.preventDefault();
      navigateTo(e.target.parentElement.href);
      view = location.pathname
      setTimeout(() => {
         document.getElementsByClassName("main")[0].innerHTML = views[view]
         //   requistManager()
      }, 50);
   }
})

function navigateTo(url) {
   history.pushState(null, null, url)
   console.log(location.pathname)

}
//end of routering




let userData = JSON.parse(localStorage.getItem("userData"))

if (userData) {
   if (userData.profileImage) {

      document.getElementById("account").innerHTML = '  <button class="profile-data"><div class="profile-img"></div>         <i class="fa-solid fa-caret-down"></i>                    </button>'
      document.getElementsByClassName("profile-img")[0].innerHTML = "  <img  src='' alt='profile'  >   ";
      document.querySelector(".profile-img img").src = userData.profileImage;


   } else { console.log("It is necessary to login") }

}









document.getElementsByClassName("fa-bars")[0].addEventListener("click", () => {

   document.getElementsByTagName("nav")[0].classList.toggle("open")
})







// sign up function
function regester(event) {
   event.preventDefault()
   // inputs
   let username = document.getElementById("username").value
   let name = document.getElementById("name").value
   let email = document.getElementById("email").value
   let password = document.getElementById("password").value
   let confirmPassword = document.getElementById("confirmPassword").value


   fetch("/users/signUp", {
      method: "post",
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
         username: username,
         name: name,
         email: email,
         password: password,
         confirmPassword: confirmPassword
      })
   }).then((response) => {
      response.json().then((userData) => {

         localStorage.setItem('userData', JSON.stringify(userData));



         if (userData) {
            if (userData.profileImage) {

               document.getElementsByClassName("profile-img")[0].innerHTML = "  <img  src='' alt='profile'  >   ";
               document.querySelector(".profile-img img").src = userData.profileImage;


            }

         }




         console.log(userData);

      }
      )
   })



}




// sign in function 
function login(event) {
   event.preventDefault()
   // inputs
   let email = document.getElementById("email").value
   let password = document.getElementById("password").value



   fetch("/users/signIn", {
      method: "post",
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ email: email, password: password })
   }).then((response) => {
      response.json().then((userData) => {

         localStorage.setItem('userData', JSON.stringify(userData));



         if (userData) {
            if (userData.profileImage) {
               document.getElementById("account").innerHTML = '  <button class="profile-data"><div class="profile-img"></div>         <i class="fa-solid fa-caret-down"></i>                    </button>'
               document.getElementsByClassName("profile-img")[0].innerHTML = "  <img  src='' alt='profile'  >   ";
               document.querySelector(".profile-img img").src = userData.profileImage;


            }

         }




         console.log(userData);

      }
      )
   })



}


function resetPassword(event) {
   event.preventDefault()
   // inputs
   let email = document.getElementById("email").value

   fetch("/users/reset-password", {
      method: "post",
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ email: email })
   }).then((response) => {
      response.json().then((result) => {

         console.log(result);

      }
      )
   })

}



