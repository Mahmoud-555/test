let signUpView =/*html*/` 

<div div class="card">
  <div div class="card2">
    <form class="form" onsubmit="regester(event)">
      <p id="heading">Regester</p>
      <span style="display: contents;">

      

      <div class="field">
      <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
        xmlns="http://www.w3.org/2000/svg" class="input-icon">
         <path
           d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
         </path>
      </svg>
      <input required type="text" class="input-field" placeholder="Username" id="username" autocomplete="off">
    </div>



    <div class="field">
    <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
      xmlns="http://www.w3.org/2000/svg" class="input-icon">
       <path
         d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
       </path>
    </svg>
    <input required type="text" class="input-field" placeholder="Your Name" id="name" autocomplete="off">
  </div>







        <div class="field">
          <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
            xmlns="http://www.w3.org/2000/svg" class="input-icon">
             <path
               d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
             </path>
          </svg>
          <input required type="email" class="input-field" placeholder="Email" id="email" autocomplete="off">
        </div>


        
        <div class="field"><svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
            xmlns="http://www.w3.org/2000/svg" class="input-icon">
            <path
              d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z">
            </path>
          </svg><input required type="password" class="input-field" placeholder="Password" id=password></div>
     
          
     
          <div class="field"><svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
          xmlns="http://www.w3.org/2000/svg" class="input-icon">
          <path
            d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z">
          </path>
        </svg><input required type="password" class="input-field" placeholder="Confirm Password" id=confirmPassword></div>
   

        </span>




      <div class="bt">
        <button class="button2 regester" type="submit">Regester</button>
        <button  type="button" class="button1 login ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="/login" class="data-link">Login</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
 
      </div>
    </form>
  </div>
</div> `





let loginView =/*html*/` 
    
    <form id="login-form" onsubmit="login(event)">
    <h1>Login</h1>
      <label for="email">Email:</label>
      <input type="email" id="email"  required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" minlength="6" required>
      <br>
      <button type="submit">Login</button>
     <p>
      Don't have an account? <a class="data-link" href="signUp">Register here</a>.
    </p>
    <p>
      Forgot your password? <a class="data-link" href="forgot-password">Reset it here</a>.
    </p>
    </form>
   
  `


let forgotPasswordView =/*html*/` 

<div div class="card">
  <div div class="card2">
    <form class="form" onsubmit="resetPassword(event)" >
      <p id="heading">Forgot password</p>
      <span style="display: contents;">
       
      
      
      
      
      <div class="field">
          <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
            xmlns="http://www.w3.org/2000/svg" class="input-icon">
             <path
               d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
             </path>
          </svg>
          <input required type="email" class="input-field" placeholder="Email" id="email" autocomplete="off">
        </div>



      </span>
      <div class="bt">
        <button type="submit" class="button1 submit  ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
        <button  type="button" class="button1 login ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="/login" class="data-link">Login</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>

    </form>
  </div>
</div> `









let verifyEmailView =/*html*/` 

<div div class="card">
  <div div class="card2">
    <div class="form">
      <p id="heading">Verify</p>
      <span style="display: contents;">



       

        
        <div class="field"><svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
            xmlns="http://www.w3.org/2000/svg" class="input-icon">
            <path
              d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z">
            </path>
          </svg><input type="text" class="input-field" placeholder="Verification Code" id=verificationCode></div>
      </span>
      <div class="bt"><button 
          class="button1 login ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button><button
          class="button2 regester" onclick="toREgester()">Regester</button></div><button class="button3">Forgot Password</button>
    </div>
  </div>
</div> `








