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

<div class="title-info" style="    color: white;
">

<p>clints</p>
<i class="fas fa-table"></i>
</div>

<table style="    color: white;
">
<thead >
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
   <div class="container">
       
        <div id="type-selection-page" class="page" style="display: none;">
            <div class="page-title">
                <h2>Select Type</h2>
            </div>
            
            <div class="item-list">
                <div class="alt-card" onclick="showSubjectsPage('clinical')">
                    <div class="alt-card-header">
                        <h3 class="alt-card-title">Clinical</h3>
                        <p class="alt-card-subtitle">Clinical Questions</p>
                    </div>
                    <div class="alt-card-body">
                        <p class="alt-card-description">Select this option for clinical questions and case studies.</p>
                    </div>
                </div>
                
                <div class="alt-card" onclick="showSubjectsPage('academy')">
                    <div class="alt-card-header">
                        <h3 class="alt-card-title">Academy</h3>
                        <p class="alt-card-subtitle">Academic Questions</p>
                    </div>
                    <div class="alt-card-body">
                        <p class="alt-card-description">Select this option for academic and theoretical questions.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="page" id="questions-page">
            <div class="page-title">
                <h2>MCQ List</h2>
                <button id="create-mcq-btn" class="btn">
                    <i class="fas fa-plus"></i> Create New MCQ
                </button>
            </div>
            
            <div class="search-filter-container">
                <div class="search-row">
                    <div class="search-group">
                        <label for="search-mcq">Search MCQs</label>
                        <input type="text" id="search-mcq" class="search-input" placeholder="Search by question or options...">
                    </div>
                </div>
                
                <div class="filter-group">
                    <div>
                        <label for="filter-difficulty">Difficulty</label>
                        <select id="filter-difficulty">
                            <option value="">All Difficulties</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="filter-time">Time (minutes)</label>
                        <select id="filter-time">
                            <option value="">All Times</option>
                            <option value="1">1 min</option>
                            <option value="5">5 min</option>
                            <option value="10">10 min</option>
                            <option value="15">15 min</option>
                            <option value="20">20 min</option>
                            <option value="30">30 min</option>
                            <option value="60">60 min</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="filter-correct">Correct Answer</label>
                        <select id="filter-correct">
                            <option value="">All</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div id="mcq-list" class="mcq-list">
                <!-- MCQs will be loaded here -->
            </div>
        </div>

  <div id="subjects-page" class="page" style="display: none;">
            <div class="page-title">
                <h2>Subjects</h2>
                <button id="add-subject-btn" class="btn">
                    <i class="fas fa-plus"></i> Add New Subject
                </button>
            </div>
            
            <div class="breadcrumb">
                <a href="#" onclick="event.preventDefault();showTypeSelectionPage()">Home</a>
                <span>></span>
                <span>Subjects</span>
            </div>
            
            <div id="subjects-list" class="item-list">
                <!-- Subjects will be loaded here -->
            </div>
        </div>
        
        <div id="modules-page" class="page" style="display: none;">
            <div class="page-title">
                <h2>Modules</h2>
                <button id="add-module-btn" class="btn" onclick="showModuleForm()">
                    <i class="fas fa-plus"></i> Add New Module
                </button>
            </div>
            
            <div class="breadcrumb">
                <a href="#" onclick="event.preventDefault();showTypeSelectionPage()">Home</a>
                <span>></span>
                <a href="#" onclick="event.preventDefault();showSubjectsPage(currentType)"><span id="subject-name-breadcrumb-modules"></span></a>
                <span>></span>
                <span>Modules</span>
            </div>
            
            <div id="modules-list" class="item-list">
                <!-- Modules will be loaded here -->
            </div>
        </div>
        
        <div id="lectures-page" class="page" style="display: none;">
            <div class="page-title">
                <h2>Lectures</h2>
                <button id="add-lecture-btn" class="btn">
                    <i class="fas fa-plus"></i> Add New Lecture
                </button>
            </div>
            
            <div class="breadcrumb">
                <a href="#" onclick="event.preventDefault();showTypeSelectionPage()">Home</a>
                <span>></span>
                <a href="#" onclick="event.preventDefault();showSubjectsPage(currentType)"><span id="module-subject-breadcrumb"></span></a>
                <span>></span>
                <a href="#" onclick="event.preventDefault();showModulesPage(currentSubject._id)"><span id="module-name-breadcrumb"></span></a>
                <span>></span>
                <span>Lectures</span>
            </div>
            
            <div id="lectures-list" class="item-list">
                <!-- Lectures will be loaded here -->
            </div>
        </div>
        
        <div id="mcqs-page" class="page" style="display: none;">
            <div class="page-title">
                <h2>MCQs</h2>
                <button id="add-mcq-btn" class="btn">
                    <i class="fas fa-plus"></i> Add New MCQ
                </button>
            </div>
            
            <div class="breadcrumb">
                <a href="#" onclick="event.preventDefault();showTypeSelectionPage()">Home</a>
                <span>></span>
                <a href="#" onclick="event.preventDefault();showSubjectsPage(currentType)"><span id="lecture-module-breadcrumb"></span></a>
                <span>></span>
                <a href="#" onclick="event.preventDefault();showModulesPage(currentSubject._id)"><span id="lecture-module-name-breadcrumb"></span></a>
                <span>></span>
                <a href="#" onclick="event.preventDefault();showLecturesPage(currentModule._id)"><span id="lecture-name-breadcrumb"></span></a>
                <span>></span>
                <span>MCQs</span>
            </div>
            
            <div id="mcqs-list" class="item-list">
                <!-- MCQs will be loaded here -->
            </div>
        </div>
        
        <div id="subject-form-container" class="page" style="display: none;">
            <div class="page-title">
                <h2 id="subject-form-title">Add New Subject</h2>
            </div>
            
            <form id="subject-form">
                <div class="form-group">
                    <label for="subject-name">Subject Name</label>
                    <input type="text" id="subject-name" required>
                </div>
                
                <button type="submit" class="btn">
                    <i class="fas fa-save"></i> Save Subject
                </button>
                <button type="button" class="btn back-btn" onclick="showSubjectsPage()">
                    <i class="fas fa-arrow-left"></i> Cancel
                </button>
            </form>
        </div>
        
        <div id="lecture-form-container" class="page" style="display: none;">
            <div class="page-title">
                <h2 id="lecture-form-title">Add New Lecture</h2>
            </div>
            
            <form id="lecture-form">
                <div class="form-group">
                    <label for="lecture-title">Lecture Title</label>
                    <input type="text" id="lecture-title" required>
                </div>
                
                <div class="form-group">
                    <label for="lecture-description">Description</label>
                    <textarea id="lecture-description" rows="4"></textarea>
                </div>
                
                <button type="submit" class="btn">
                    <i class="fas fa-save"></i> Save Lecture
                </button>
                <button type="button" class="btn back-btn" onclick="showLecturesPage(currentModule._id)">
                    <i class="fas fa-arrow-left"></i> Cancel
                </button>
            </form>
        </div>
        
        <div id="module-form-container" class="page" style="display: none;">
            <div class="page-title">
                <h2 id="module-form-title">Add New Module</h2>
            </div>
            
            <form id="module-form">
                <div class="form-group">
                    <label for="module-name">Module Name</label>
                    <input type="text" id="module-name" required>
                </div>
                
                <button type="submit" class="btn">
                    <i class="fas fa-save"></i> Save Module
                </button>
                <button type="button" class="btn back-btn" onclick="showModulesPage(currentSubject._id)">
                    <i class="fas fa-arrow-left"></i> Cancel
                </button>
            </form>
        </div>
        

          <div id="mcq-form-container" class="page" style="display: none;">
            <div class="page-title">
                <h2 id="mcq-form-title">Add New MCQ</h2>
            </div>

            <form id="mcq-form">
                <div class="form-group">
                    <label for="mcq-question">Question</label>
                    <textarea id="mcq-question" rows="3" required></textarea>
                </div>









                

                <!-- New fields for time and difficulty -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="mcq-time">Time (minutes)</label>
                        <input type="number" id="mcq-time" min="1" max="60" value="5" required>
                    </div>

                    <div class="form-group">
                        <label for="mcq-difficulty">Difficulty</label>
                        <select id="mcq-difficulty" required>
                            <option value="easy">Easy</option>
                            <option value="medium" selected>Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Options</label>
                    <div id="options-container" class="mcq-options">
                        <!-- Options will be added here dynamically -->
                    </div>
                    <div class="option-controls">
                        <button type="button" id="add-option-btn" class="btn">
                            <i class="fas fa-plus"></i> Add Option
                        </button>
                    </div>
                </div>

                <div class="form-group">
                    <label for="mcq-correct">Correct Answer</label>
                    <select id="mcq-correct" required>
                        <option value="">Select correct option</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="mcq-image">Image (Optional)</label>
                    <div class="image-upload-container">
                        <div class="image-preview" id="image-preview">
                            <div class="image-preview-placeholder">No image selected</div>
                        </div>
                        <div class="file-input-wrapper">
                            <div class="file-input-button">
                                <i class="fas fa-upload"></i> Choose Image
                            </div>
                            <input type="file" id="mcq-image" accept="image/*">
                        </div>
                        <div class="file-name" id="file-name"></div>
                    </div>
                </div>

                <button type="submit" class="btn">
                    <i class="fas fa-save"></i> Save MCQ
                </button>
                <button type="button" class="btn back-btn" onclick="showMCQsPage(currentLecture._id)">
                    <i class="fas fa-arrow-left"></i> Cancel
                </button>
            </form>
        </div>


    </div>
    
    <!-- Modal for editing MCQs -->
    <div id="mcq-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Create New MCQ</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
              <form id="modal-mcq-form">
                <div class="form-group">
                    <label for="mcq-question">Question</label>
                    <textarea id="mcq-question" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label>Options</label>
                    <div id="options-container" class="mcq-options">
                        <!-- Options will be added here dynamically -->
                    </div>
                    <div class="option-controls">
                        <button type="button" id="add-option-btn" class="btn btn-add-option">
                            <i class="fas fa-plus"></i> Add Option
                        </button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="mcq-correct">Correct Answer</label>
                    <select id="mcq-correct" required>
                        <option value="">Select correct option</option>
                    </select>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="mcq-time">Time (minutes)</label>
                        <input type="number" id="mcq-time" min="1" max="60" value="5" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="mcq-difficulty">Difficulty</label>
                        <select id="mcq-difficulty" required>
                            <option value="easy">Easy</option>
                            <option value="medium" selected>Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>
                
                
                
                
                <div class="form-group">
                    <label for="mcq-image">Image (Optional)</label>
                    <div class="image-upload-container">
                        <div class="image-preview" id="image-preview">
                            <div class="image-preview-placeholder">No image selected</div>
                        </div>
                        <div class="file-input-wrapper">
                            <div class="file-input-button">
                                <i class="fas fa-upload"></i> Choose Image
                            </div>
                            <input type="file" id="mcq-image" accept="image/*">
                        </div>
                        <div class="file-name" id="file-name"></div>
                    </div>
                </div>
                
               
            </form>
        </div>
        <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="cancel-btn">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="btn" id="save-mcq-btn">
                        <i class="fas fa-save"></i> Save MCQ
                    </button>
        </div>
           
        </div>
    </div>
    
    <div id="notification" class="notification">Operation completed successfully!</div>
    

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
