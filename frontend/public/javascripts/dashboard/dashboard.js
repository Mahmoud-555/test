// routing start

let views = {
    "/dashboard": mainView,
    "/dashboard/clints": clintsView,
    "/dashboard/questions": questionsView,
    "/dashboard/posts": postsView
}
let view = location.pathname

document.getElementsByClassName("content")[0].innerHTML = views[view]


window.addEventListener('popstate', function (e) {
    view = location.pathname
    setTimeout(() => {
        document.getElementsByClassName("content")[0].innerHTML = views[view]
        requistManager()

    }, 250);
    console.log(view);
});

// routing end


let userData = JSON.parse(localStorage.getItem("userData"))

getSubjects()
getLectures()
getGrades()
getBlocks()

// fill options

document.querySelector(".profile-img img").src = userData.profileImage






requistManager()






async function getSubjects() {
    let response = await fetch("/subjects")

    let data = await response.json()
    localStorage.setItem("subjects", JSON.stringify(data))

    console.log(data)
}
async function getLectures() {
    let response = await fetch("/lectures")

    let data = await response.json()
    localStorage.setItem("lectures", JSON.stringify(data))

    console.log(data)
}
async function getGrades() {
    let response = await fetch("/grades")

    let data = await response.json()
    localStorage.setItem("grades", JSON.stringify(data))

    console.log(data)
}
async function getBlocks() {
    let response = await fetch("/blocks")

    let data = await response.json()
    localStorage.setItem("blocks", JSON.stringify(data))

    console.log(data)
}








async function getU() {
    let response = await fetch("/users")

    let data = await response.json()

    let usersNum = document.getElementsByClassName("usersNum")[0]

    console.log(data)
    if (usersNum) {
        usersNum.innerHTML = data.length
    }

}
async function getQ() {
    let response = await fetch("/questions")
    let data = await response.json()

    let questionsTable = document.getElementById('questionsTable')
    let questionsNum = document.getElementsByClassName("questionsNum")[0]


    console.log(questionsTable)

    if (questionsNum) {
        questionsNum.innerHTML = data.length
    }

    questionsTable.innerHTML = ""

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        questionsTable.innerHTML += `<tr><td class="question">${element.question}</td><td><span class="price lecture">${element.lecture}</span></td><td><span class="count ">${element.answer}</span></td></tr>`
    }



}



function fillOptions() {
    let subjectinput = document.getElementById("subject")
    let lectureinput = document.getElementById("lecture")
    let gradeinput = document.getElementById("grade")
    let blockinput = document.getElementById("block")

    let subject = document.getElementById("subjects")
    let lecture = document.getElementById("lectures")
    let grade = document.getElementById("grades")
    let block = document.getElementById("blocks")



    blockinput.addEventListener("focus", () => {
        block.innerHTML = ""

        let blocks = JSON.parse(localStorage.getItem("blocks"))


        for (let i = 0; i < blocks.length; i++) {
            block.innerHTML += `<option value="${blocks[i].block}">`
        }
        block.innerHTML += `<option value="Add new block"></option>`

    })

    subjectinput.addEventListener("focus", () => {
        subject.innerHTML = ""

        let subjects = JSON.parse(localStorage.getItem("subjects"))


        for (let i = 0; i < subjects.length; i++) {
            subject.innerHTML += `<option value="${subjects[i].subject}">`
        }
        subject.innerHTML += `<option value="Add new subject"></option>`

    })
    lectureinput.addEventListener("focus", () => {
        let lectures = JSON.parse(localStorage.getItem("lectures"))
        lecture.innerHTML = ""
        for (let i = 0; i < lectures.length; i++) {
            lecture.innerHTML += `<option value="${lectures[i].lecture}">`

        }
        lecture.innerHTML += `<option value="Add new lecture"></option>`

    })
    gradeinput.addEventListener("focus", () => {
        let grades = JSON.parse(localStorage.getItem("grades"))
        grade.innerHTML = ""
        for (let i = 0; i < grades.length; i++) {
            grade.innerHTML += `<option value="${grades[i].grade}">`

        }
        grade.innerHTML += `<option value="Add new grade"></option>`
    })

}





function createNewBlock() {

    // inputs
    let block = document.getElementById("block")

    block.addEventListener("change", (e) => {
        if (e.currentTarget.value == "Add new block") {
            let pr = prompt("Enter new block name:")

            if (pr == null | pr == "") {
                e.currentTarget.value = ''

            } else {

                console.log(pr)

                fetch("/blocks", {
                    method: "post",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({ block: pr })
                }).then((response) => {


                    response.json().then((result) => {
                        let blocks = JSON.parse(localStorage.getItem("blocks"))
                        blocks.push(result)
                        localStorage.setItem("blocks", JSON.stringify(blocks))


                    })
                })




            }
        }
    })




}

function createNewSubject() {

    // inputs
    let subject = document.getElementById("subject")

    subject.addEventListener("change", (e) => {
        if (e.currentTarget.value == "Add new subject") {
            let pr = prompt("Enter new subject name:")

            if (pr == null | pr == "") {
                e.currentTarget.value = ''

            } else {

                fetch("/subjects", {
                    method: "post",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({ "subject": pr })
                }).then((response) => {


                    response.json().then((result) => {
                        let subjects = JSON.parse(localStorage.getItem("subjects"))
                        subjects.push(result)
                        localStorage.setItem("subjects", JSON.stringify(subjects))


                    })
                })






                console.log(pr)
            }
        }
    })




}

function createNewLecture() {

    // inputs
    let lecture = document.getElementById("lecture")

    lecture.addEventListener("change", (e) => {
        if (e.currentTarget.value == "Add new lecture") {
            let pr = prompt("Enter new lecture name:")

            if (pr == null | pr == "") {
                e.currentTarget.value = ''

            } else {

                fetch("/lectures", {
                    method: "post",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({ lecture: pr })
                }).then((response) => {


                    response.json().then((result) => {
                        let lectures = JSON.parse(localStorage.getItem("lectures"))
                        lectures.push(result)
                        localStorage.setItem("lectures", JSON.stringify(lectures))


                    })
                })
                console.log(pr)
            }
        }
    })


}

function createNewGrade() {

    // inputs
    let grade = document.getElementById("grade")

    grade.addEventListener("change", (e) => {
        if (e.currentTarget.value == "Add new grade") {
            let pr = prompt("Enter new grade name:")

            if (pr == null | pr == "") {
                e.currentTarget.value = ''

            } else {
                fetch("/grades", {
                    method: "post",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({ grade: pr })
                }).then((response) => {


                    response.json().then((result) => {
                        let grades = JSON.parse(localStorage.getItem("grades"))
                        grades.push(result)
                        localStorage.setItem("grades", JSON.stringify(grades))


                    })
                })
            }
        }
    })


}

function createQ() {

    // inputs
    let questionImages = document.getElementById("questionImages").files
    let subject = document.getElementById("subject").value
    let lecture = document.getElementById("lecture").value
    let grade = document.getElementById("grade").value
    let question = document.getElementById("question").value



    let answers = document.getElementsByClassName("answer")
    let wrongAnswers = document.getElementsByClassName("wrong")


    let body = new FormData()

    body.append("subject", subject)
    body.append("lecture", lecture)
    body.append("grade", grade)

    body.append("question", question)

    for (let i = 0; i < questionImages.length; i++) {
        body.append("questionImages", questionImages[i]);
    }
    for (let i = 0; i < answers.length; i++) {
        body.append("answer", answers[i].value)
    }
    for (let i = 0; i < wrongAnswers.length; i++) {
        body.append("wrong", wrongAnswers[i].value)
    }





    fetch("/questions/add", {
        method: "post",

        body: body
    }).then((response) => {
        response.json().then((result) => { console.log(result) })
    })

}

function navigateTo(url) {
    history.pushState(null, null, url)
    console.log(location.pathname)

}



function requistManager() {
    if (view == "/dashboard") {
        getU()
        getQ()
    } else if (view == "/dashboard/clints") {
        getU()
    } else if (view == "/dashboard/questions") {
        fillOptions()
        getQ()
        createNewBlock()
        createNewSubject()
        createNewLecture()
        createNewGrade()





        let form = document.getElementsByTagName("form")[0]


        form.addEventListener("submit", function (event) {
            event.preventDefault();
            createQ()
        });

    } else if (view == "/dashboard/posts") {

    }
}






document.body.addEventListener("click", e => {
    if (e.target.classList.contains("data-link")) {

        e.preventDefault();
        navigateTo(e.target.href);
        view = location.pathname
        setTimeout(() => {
            document.getElementsByClassName("content")[0].innerHTML = views[view]
            requistManager()
        }, 250);

    } else if (e.target.parentElement.classList.contains("data-link")) {

        e.preventDefault();
        navigateTo(e.target.parentElement.href);
        view = location.pathname
        setTimeout(() => {
            document.getElementsByClassName("content")[0].innerHTML = views[view]
            requistManager()
        }, 250);


    }


})






