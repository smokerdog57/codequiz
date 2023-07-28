// Assign HTML element to global variables
var headerQuizIntroEl = document.querySelector("#headerQuizIntro");
var sectionQaEl = document.querySelector("#sectionQA");
var sectionResultsEl = document.querySelector("#sectionResults");
var sectionResultsHistoryEl = document.querySelector("#sectionResultsHistory");
var answerResultEl = document.querySelector("#answerResult");
var questionEl = document.querySelector("#question");
var a1Btn = document.querySelector("#a1");
var a2Btn = document.querySelector("#a2");
var a3Btn = document.querySelector("#a3");
var a4Btn = document.querySelector("#a4");
var startQuizBtn = document.querySelector("#startQuizBtn");
var timeCountEl = document.querySelector("#count");
var initialsEl = document.querySelector("#initials");
var finalScoreEl = document.querySelector("#finalScore");
var submitBtn = document.querySelector("#submit");
var goBackBtn = document.querySelector("#goBack");
var clearBtn = document.querySelector("#clear");
var viewHighScoresBtn = document.querySelector("#highScores");

// Initialize the Global Q&A array of question/answer objects
var selectedAnswer = "";
var indexQ = 0;
var currentQ = "";
var initialCount = 75;
var intervalId;
var finalScore;
var historyIndex = 1;

// Initialize the Q&A array of qA objects
qA = [{
    question: "Commonly used datatypes do NOT include:",
    a1: "strings",
    a2: "booleans",
    a3: "alerts",
    a4: "numbers",
    correctA: "a3"
},
{
    question: "The condition in an IF ELSE statement is enclosed in _________",
    a1: "quotes",
    a2: "curly brackets",
    a3: "parenthesis",
    a4: "square brackets",
    correctA: "a3"
}
]

// display the quiz intro screen and stop here until start quiz button is pushed
headerQuizIntroEl.className = "quiz-intro-screen";

// listen for start quiz click, hide the intro screen, display the Q&A screen and initialize qA1 elements
startQuizBtn.addEventListener("click", function () {
    console.log("start button was clicked");
    startQuiz();
});

viewHighScoresBtn.addEventListener("click", function () {
    sectionResultsHistoryEl.classList.remove("hidden"); // Show the high scores history screen
    sectionResultsEl.classList.add("hidden"); // Hide the quiz results screen
    sectionQaEl.classList.add("hidden"); // Hide the quiz Q&A screen
    headerQuizIntroEl.classList.add("hidden"); // Hide the quiz intro screen
})

function startQuiz() {
    headerQuizIntroEl.classList.add("hidden");
    sectionQaEl.classList.remove("hidden");
    // start countdown timer at 75 seconds
    countdown(initialCount);
    getQuestions(indexQ);
}
// set the countdown timer
function countdown() {
    var count = initialCount;
    intervalId = setInterval(function () {
        timeCountEl.textContent = (count);
        count--;
        if (count < 0) {
            clearInterval(intervalId); // Stop the interval when the countdown is completed
        }
    }, 1000); // 1000 milliseconds = 1 second
    //return
}

function getQuestions(indexQ) {
    answerResultEl.textContent = "";
    var currentQ = qA[indexQ];
    questionEl.textContent = currentQ.question;
    a1Btn.textContent = `1. ${currentQ.a1}`;
    a2Btn.textContent = `2. ${currentQ.a2}`;
    a3Btn.textContent = `3. ${currentQ.a3}`;
    a4Btn.textContent = `4. ${currentQ.a4}`;
}

// listen for a click on the selected answer button call checkAnswer function 
// passing selectedAnswer string
a1Btn.addEventListener("click", function (event) {
    selectedAnswer = "a1";
    checkAnswer(selectedAnswer, qA[indexQ]);
});

a2Btn.addEventListener("click", function (event) {
    selectedAnswer = "a2";
    checkAnswer(selectedAnswer, qA[indexQ]);
});

a3Btn.addEventListener("click", function (event) {
    selectedAnswer = "a3";
    checkAnswer(selectedAnswer, qA[indexQ]);
});

a4Btn.addEventListener("click", function (event) {
    selectedAnswer = "a4";
    checkAnswer(selectedAnswer, qA[indexQ]);
});

// check the current answer against the correct answer and increment indexQ
// if last question - progress to results screen
function checkAnswer(selectedAnswer, currentQ) {
    if (selectedAnswer === currentQ.correctA) {
        answerResultEl.textContent = "Correct!";
    } else {
        answerResultEl.textContent = "Wrong!";
        // 10 seconds penalty due to wrong answer
        initialCount = parseInt(timeCountEl.textContent) + 10;
        clearInterval(intervalId); // clear the current interval
        countdown(); // call countdown to update with 10 sec penalty CHANGED***
    }
    indexQ++;

    // Check if we reached the end of questions
    if (indexQ < qA.length && parseInt(timeCountEl.textContent) > 0) {
        // .5sec delay then get next question
        setTimeout(function () {
            getQuestions(indexQ);
        }, 500);
    } else {
        // .5 sec delay then display Results screen
        setTimeout(function () {
            sectionQaEl.classList.add("hidden");
            sectionResultsEl.classList.remove("hidden");
            // freeze the countdown timer and log the count down time count to the score
            clearInterval(intervalId);
            finalScore = finalScoreEl.textContent = (timeCountEl.textContent);
        }, 500);
    }
}

submitBtn.addEventListener("click", function () {
    var inputValue = initialsEl.value.trim();
    if (inputValue === "") { //verify user entered intials
        alert("Please enter your initials before clicking submit")
    }
    else {
        getResultsHistory(inputValue);
    }
});

function getResultsHistory(initials) {
    sectionResultsEl.classList.add("hidden");
    sectionResultsHistoryEl.classList.remove("hidden");
    var resultsHistoryList = document.getElementById("results-history-ul");
    var newListItem = document.createElement("li");
    newListItem.textContent = `${historyIndex}.  ${initials} - ${finalScore}`;
    resultsHistoryList.appendChild(newListItem);
    historyIndex++;
}

goBackBtn.addEventListener("click", function () {
    sectionResultsHistoryEl.classList.add("hidden");
    indexQ = 0;
    initialCount = 75;
    startQuiz();
})

clearBtn.addEventListener("click", function () {
    sectionResultsHistoryEl.classList.remove("hidden");
    indexQ = 0;
    initialCount = 75;
    var ulElement = document.querySelector("#results-history-ul");
    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild);
    }
})

