let mainView =/*html*/`  
<div class="title-info">
    dashboard</p>
    <i class="fas fa-chart-bar"></i>
</div>
<div class="data-info">


    <div class="box">
        <i class="fas fa-user"></i>
        <div class="data">
            <p>user</p>
            <span class="usersNum">100</span>
        </div>
    </div>

    <div class="box">
        <i class="fas fa-pen"></i>
        <div class="data">
            <p>posts</p>
            <span>100</span>
        </div>
    </div>


    <div class="box">
        <i class="fas fa-table"></i>
        <div class="data">
            <p>questions</p>
            <span class="questionsNum">100</span>
        </div>
    </div>

    <div class="box">
        <i class="fas fa-user"></i>
        <div class="data">
            <p>user</p>
            <span>100</span>
        </div>
    </div>
</div>

<div class="title-info">
    <p>questions</p>
    <i class="fas fa-table"></i>
</div>








`


let clintsView =/*html*/`

<button class="create-Btn">
  
  <div class="sign">+</div>
  
  <div class="text">Create</div>
</button>

<div class="title-info">

<p>clints</p>
<i class="fas fa-table"></i>
</div>

<table>
<thead>
    <tr>
        <th>id</th>
        <th>name</th>
        <th>email</th>
        <th>password</th>
    </tr>
</thead>
<tbody id="clintsTable">
    <tr>
        <td>tv</td>
        <td><span class="price">100</span></td>
        <td><span class="count">100</span></td>
    </tr>

    <tr>
        <td>tv</td>
        <td><span class="price">100</span></td>
        <td><span class="count">100</span></td>
    </tr>

    <tr>
        <td>tv</td>
        <td><span class="price">100</span></td>
        <td><span class="count">100</span></td>
    </tr>
    <tr>
        <td>tv</td>
        <td><span class="price">100</span></td>
        <td><span class="count">100</span></td>
    </tr>
</tbody>


</table>



`



let questionsView =/*html*/`  

  

<div div="" class="createCard" style="display: none;">
  <div div="" class="card2">
    <form class="form">
      <p id="heading">create new question</p>


      <span style="display: contents;">

        <div class="field">
          <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="input-icon">
          <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
          </path>
          </svg>
        <input multiple="" type="file" class="input-field" placeholder="Image" id="questionImages" autocomplete="off">
        </div>
  


        
        
  <div class="field">
  <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="input-icon">
     <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
     </path>
  </svg>
  <input required="" type="text" class="input-field" placeholder="block" list="blocks" id="block" autocomplete="off">
 
  <datalist id="blocks">
  <option value="Edge">
  </option><option value="Firefox">
  </option><option value="Chrome">
  </option><option value="Opera">
  </option><option value="Add new subject">
</option></datalist>
</div>

        
  <div class="field">
    <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="input-icon">
       <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
       </path>
    </svg>
    <input required="" type="text" class="input-field" placeholder="subject" list="subjects" id="subject" autocomplete="off">
   
    <datalist id="subjects">
    <option value="Edge">
    </option><option value="Firefox">
    </option><option value="Chrome">
    </option><option value="Opera">
    </option><option value="Add new subject">
  </option></datalist>
  </div>



        <div class="field">
          <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="input-icon">
             <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
             </path>
          </svg>
          <input required="" type="text" class="input-field" placeholder="Lecture" list="lectures" id="lecture" autocomplete="off">
          <datalist id="lectures">
          <option value="Edge"></option>
          <option value="Firefox"></option>
          <option value="Chrome"></option>
          <option value="Opera"></option>
          <option value="Add new lecture"></option></datalist>
        </div>



        <div class="field">
       <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="input-icon">
         <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
         </path>
       </svg>
       <input required="" type="text" class="input-field" placeholder="Grade" list="grades" id="grade" autocomplete="off">
       <datalist id="grades">
       <option value="Edge">
       </option><option value="Firefox">
       </option><option value="Chrome">
       </option><option value="Opera">
       </option><option value="Add new grade">

     </option></datalist>
     </div>



        <div class="field">
          <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="input-icon">
             <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
             </path>
          </svg>
          <input required="" type="text" class="input-field" placeholder="Question" id="question" autocomplete="off">
        </div>
          
        
         <span style="
    display: flex;
    align-items: center;
"><hr style="/* display: flex; */width: 100%;margin-right: 6px;/* align-content: space-between; */border-bottom-color: #0070c7;border-bottom-width: 3px;">


<p style="
    color: #00ffbd;
    text-wrap: nowrap;
">Correct options</p><hr style="/* display: flex; */width: 100%;margin-left: 6px;/* align-content: space-between; */border-bottom-color: #0072c7;border-bottom-width: 3px;"></span>


        <div class="field">
          <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="input-icon">
             <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
             </path>
          </svg>
          <input required="" type="text" class="input-field answer" placeholder="Answer"  autocomplete="off">
         </div><span><button style="border-radius: 7px;display: inline;color: #eee;background-color: #47c12f;margin: auto;width: 12%;font-size: 20px;margin-right: 7px;">+</button><label style="
    display: inline;
    font-size: 12px;
">Add option
         </label></span>


         
         
       
         <span style="
    display: flex;
    align-items: center;
"><hr style="/* display: flex; */width: 100%;margin-right: 6px;/* align-content: space-between; */border-bottom-color: #0070c7;border-bottom-width: 3px;">


<p style="
    color: #00ffbd;
    text-wrap: nowrap;
">wrong options</p><hr style="/* display: flex; */width: 100%;margin-left: 6px;/* align-content: space-between; */border-bottom-color: #0072c7;border-bottom-width: 3px;"></span>


<div class="field">
         <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="input-icon">
           <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
           </path>
         </svg>
         <input required="" type="text" class="input-field wrong" placeholder="Wrong answer"  autocomplete="off">
       </div>
       <div class="field">
         <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="input-icon">
           <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
           </path>
         </svg>
         <input required="" type="text" class="input-field wrong" placeholder="Wrong answer"  autocomplete="off">
       </div><div class="field">
         <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="input-icon">
           <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
           </path>
         </svg>
         <input required="" type="text" class="input-field wrong" placeholder="Wrong answer" autocomplete="off">
       </div>


<span><button style="border-radius: 7px;display: inline;color: #eee;background-color: #47c12f;margin: auto;width: 12%;font-size: 20px;margin-right: 7px;">+</button><label style="
    display: inline;
    font-size: 12px;
">Add option
         </label></span>
         

       
      




     
          
      </span>
      <div class="bt">
      <button type="submit" class="button2 createQuestion">create</button>
      </div>
    </form>
  </div>
</div>














      




     
          
   









<button onclick='document.getElementsByClassName("createCard")[0].style.display="block"' class="create-Btn">
  
  <div class="sign">+</div>
  
  <div class="text">Create</div>
</button>

<div class="title-info">
<p>questions</p>
<i class="fas fa-table"></i>
</div>

<table>
<thead>
    <tr>
        <th>question</th>
        <th>lecture</th>
        <th>ansower</th>
        <th>ansower</th>
    </tr>
</thead>
<tbody id="questionsTable">
    <tr>
        <td>tv</td>
        <td><span class="price">100</span></td>
        <td><span class="count">100</span></td>
    </tr>

    <tr>
        <td>tv</td>
        <td><span class="price">100</span></td>
        <td><span class="count">100</span></td>
    </tr>

    <tr>
        <td>tv</td>
        <td><span class="price">100</span></td>
        <td><span class="count">100</span></td>
    </tr>
    <tr>
        <td>tv</td>
        <td><span class="price">100</span></td>
        <td><span class="count">100</span></td>
    </tr>
</tbody>


</table>



  `



let postsView =/*html*/`        `


let createNewClint =/*html*/` 

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
        <button  type="button" class="button1 login ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="/signIn" class="data-link">Login</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
 
      </div>
    </form>
  </div>
</div> `
