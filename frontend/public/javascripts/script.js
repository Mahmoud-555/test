// const questions = [
//     { question: "ما هي عاصمة فرنسا؟", answers: ["باريس", "برلين", "مدريد", "روما"], correct: "باريس" },
//     { question: "من هو مؤلف كتاب '1984'؟", answers: ["جورج أورويل", "ألدوس هكسلي", "سلمان رشدي", "جون شتاينبك"], correct: "جورج أورويل" },
//     { question: "ما هو أكبر كوكب في المجموعة الشمسية؟", answers: ["المشتري", "زحل", "أرض", "نبتون"], correct: "المشتري" },
//     { question: "ما هو العنصر الكيميائي الذي يرمز له بالرمز O؟", answers: ["الأكسجين", "الكربون", "الهيدروجين", "النيتروجين"], correct: "الأكسجين" },
//     { question: "من هو أول إنسان مشى على سطح القمر؟", answers: ["نيل أرمسترونغ", "بز ألدرين", "مايكل كولينز", "يوري جاجارين"], correct: "نيل أرمسترونغ" },
//     { question: "ما هي أكبر قارة من حيث المساحة؟", answers: ["آسيا", "أفريقيا", "أوروبا", "أمريكا الشمالية"], correct: "آسيا" },
//     { question: "ما هي اللغة الرسمية في البرازيل؟", answers: ["البرتغالية", "الإسبانية", "الإنجليزية", "الفرنسية"], correct: "البرتغالية" },
//     { question: "من هو مؤسس شركة مايكروسوفت؟", answers: ["بيل غيتس", "ستيف جوبز", "مارك زوكربيرغ", "جاك ما"], correct: "بيل غيتس" },
//     { question: "ما هو الحيوان الذي يعتبر أسرع حيوان بري؟", answers: ["النمر", "الفهد", "الأرنب", "الزرافة"], correct: "الفهد" },
//     { question: "ما هو اسم أطول نهر في العالم؟", answers: ["نهر النيل", "نهر الأمازون", "نهر الغانج", "نهر اليانغتسي"], correct: "نهر النيل" }
// ];
questions = []

let currentQuestionIndex = 0;
const userAnswers = {}; // لتخزين الإجابات المختارة
let timerInterval;
let timeRemaining = 600; // الوقت بالثواني (10 دقائق)
const canvas = document.getElementById('timerCanvas');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2;


async function startTest() {
    const testId = localStorage.getItem('testId');

    try {
        const response = await fetch(`/api/v1/tests/${testId}`);
        const res = await response.json();
        questions = res.questions

        // بدء المؤقت عند تحميل الصفحة
        startTimer();
        // عرض السؤال الأول عند تحميل الصفحة
        buildQuiz();


    } catch (error) {
        console.error('Error fetching test:', error);
    }

}


async function sendAnswers() {
    const testId = localStorage.getItem('testId');

    fetch(`/api/v1/tests/${testId}`, {
        method: "post",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ userAnswers: userAnswers })
    }).then((response) => {
        response.json().then((res) => {
            //   localStorage.setItem('testId',res.testId );
            //   document.location.pathname = "/test/start"
            showResults(res.score)


        }
        )
    }).catch((err) => { console.log(err) })



}





document.addEventListener('DOMContentLoaded', function () {
    startTest()
});






function buildQuiz() {
    const quizContainer = document.getElementById('quiz');
    const currentQuestion = questions[currentQuestionIndex];

    const answers = currentQuestion.answers.map(answer =>
        `<button class="answer-button" value="${answer}">${answer}</button>`
    ).join('');

    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <div id=${currentQuestion._id} class="answers">${answers}</div>
    `;

    // إعادة تمييز الإجابة المختارة إذا كانت موجودة
    if (userAnswers[questions[currentQuestionIndex]._id]) {
        const selectedValue = userAnswers[questions[currentQuestionIndex]._id];
        const selectedButton = document.querySelector(`.answer-button[value="${selectedValue}"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }
    }

    updateButtons();

    updateQuestionNavigation();

}

function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        drawTimerCircle(timeRemaining);

        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}

function drawTimerCircle(time) {
    const percentage = time / 600;
    const endAngle = 2 * Math.PI * (1 - percentage);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 1, -Math.PI / 2, endAngle - Math.PI / 2);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#FF7b0f'; // لون الشريط الدائري
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#f4f4f4'; // خلفية الشريط الدائري
    ctx.stroke();
}
function updateButtons() {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const submitButton = document.getElementById('submit');

    // تغيير حالة زر السؤال السابق
    prevButton.classList.toggle('disabled', currentQuestionIndex === 0);

    // تغيير حالة زر السؤال التالي
    nextButton.classList.toggle('disabled', currentQuestionIndex === questions.length - 1);

    // تغيير حالة زر إنهاء الاختبار
    const allAnswered = Object.keys(userAnswers).length === questions.length && Object.keys(userAnswers).every(key => userAnswers[key] !== undefined && userAnswers[key] !== null && userAnswers[key] !== '');
    submitButton.classList.toggle('disabled', !allAnswered);

    if (allAnswered) {
        document.getElementById('submit').addEventListener('click', sendAnswers);

    }
}

function updateQuestionNavigation() {
    const navigationContainer = document.getElementById('question-navigation');
    navigationContainer.innerHTML = '';

    questions.forEach((_, index) => {
        const button = document.createElement('button');
        button.textContent = index + 1;
        button.className = 'question-nav-button';
        button.dataset.index = index;
        if (userAnswers[questions[index]._id]) {
            button.classList.add('answered');
        }
        if (index === currentQuestionIndex) {
            button.classList.add('selected');
        }
        button.addEventListener('click', () => {
            currentQuestionIndex = index;
            buildQuiz();
        });
        navigationContainer.appendChild(button);
    });
    const selectedButton = navigationContainer.querySelector('.selected');
    if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', inline: 'center',block:"end" });
    }
}

function showResults(score) {
    clearInterval(timerInterval); // إيقاف المؤقت عند انتهاء الاختبار


    // questions.forEach((currentQuestion, questionNumber) => {
    //     const userAnswer = userAnswers[questionNumber];
    //     if (userAnswer === currentQuestion.correct) {
    //         score++;
    //     }
    // });
   
   
   
   
    const resultsContainer = document.getElementById('results');

    const scoreElement = document.getElementById('score');

    // عرض النتيجة بشكل مناسب
    scoreElement.innerHTML = `لقد حصلت على <strong>${score}</strong> من <strong>${questions.length}</strong> أسئلة صحيحة!`;
    resultsContainer.style.display = 'block';

    // إخفاء الأسئلة والأزرار
    document.getElementById('quiz').style.display = 'none';
    document.querySelector('.navigation').style.display = 'none';
    document.querySelector('.end-test-container').style.display = 'none';


    // إخفاء الأسئلة والأزرار
    document.getElementById('quiz').style.display = 'none';
    document.querySelector('.navigation').style.display = 'none';
    document.querySelector('.end-test-container').style.display = 'none';
}

function selectAnswer(event) {
    if (event.target.classList.contains('answer-button')) {
        // إزالة التحديد من جميع الأزرار
        document.querySelectorAll('.answer-button').forEach(button => button.classList.remove('selected'));

        // إضافة التحديد إلى الزر الذي تم اختياره
        event.target.classList.add('selected');

        // تخزين الإجابة المختارة


        userAnswers[questions[currentQuestionIndex]._id] = event.target.value;
        updateButtons(); // تحديث حالة الأزرار بناءً على الإجابات
    }
}

document.getElementById('next').addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        buildQuiz();
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        buildQuiz();
    }
});

// document.getElementById('submit').addEventListener('click', showResults);

document.getElementById('quiz').addEventListener('click', selectAnswer);






















