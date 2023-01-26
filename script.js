// List elements that need to be called to functions.
var championsEl = document.getElementById("champions");
var firstPageEl = document.getElementById("first-page");
var scoreEl = document.getElementById("record-score");
var questionsEl = document.getElementById("quiz-page");
var postQuizEl = document.getElementById("post-quiz")
var correctEl = document.getElementById("correct");
var incorrectEl = document.getElementById("incorrect");
var scoreListEl = document.getElementById("score-list");
var championsEl = document.getElementById("high-score-container");

// List Button Elements.
var btnStartEl = document.querySelector("#begin-quiz");
var btnGoBackEl = document.querySelector("#return");
var btnClearScoresEl = document.querySelector("#clear-scores");

// List question and answer Elements.
var questionsEl = document.getElementById("questions");
var answerListEl = document.getElementById("answer-list");
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover;
timerEl.innerText = 0;

// List variable/array for high scores.
var NewScore = [];

// assign array details for the questions.
var arrayShuffledQuestions;
var QuestionIndex = 0;

// make variable for the array of questions for quiz. 6 - 7 questions each with multiple choice of 4 answers.
var questions = [
    {
        q: 'Arrays in Javascript can be used to store __________.',
        a: '4. all of the above',
        choices: ['1. numbers', '2. booleans', '3. strings', '4. all of the above']
    },
    {
        q: 'Inside which HTML element do we put javascript?',
        a: '3. <script>',
        choices: ['1. <h1>', '2. <js>', '3. <script>', '4. <head>']
    },
    {
        q: 'What does JSON stand for?',
        a: '1. Javascript Object Notation',
        choices: ['1. Javacript Object Notation', '2. Java strings object notifcation', '3. Javascript option notation', '4. all of the above']
    },
    {
        q: 'What syntax would call a function?',
        a: '4. function()',
        choices: ['1. var function', '2. function', '3. call function', '4. function()']
    },
    {
        q: 'When did javascript first appear?',
        a: '1. 1995',
        choices: ['1. 1995', '2. Roaring twenties', '3. 2005', '4. 2000']
    },
    {
        q: 'What does DOM stand for?',
        a: '2. Document Object Model',
        choices: ['1. Do Overnight Modules', '2. Document Object Model', '3. Divas Obviously Model', '4. Do Oo Mo']
    },
    {
        q: 'What is getItem commonly used for?',
        a: '2. local storage',
        choices: ['1. adding drama', '2. local storage', '3. online shopping', '4. naming a variable']
    },
];

// create variable for if go back button is clicked on high score page.
var renderStartPage = function () {
    championsEl.classList.add("hide")
    championsEl.classList.remove("show")
    firstPageEl.classList.remove("hide")
    firstPageEl.classList.add("show")
    scoreEl.removeChild(scoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }
    if (incorrectEl.className = "show") {
        incorrectEl.classList.remove("show");
        incorrectEl.classList.add("hide");
    };
};

// make variables and functions for if game-over is true, or if time left. Start time is 30 seconds
// make sure there are classes to show and hide quiz screen and high score screen. make questions shuffle on resets.
var setTime = function () {
    timeleft = 30;

    var timercheck = setInterval(function () {
        timerEl.innerText = timeleft;
        timeleft--
        if (gameover) {
            clearInterval(timercheck)
        };
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        };
    }, 1000)
};

//   add show and hide classes and make questions shuffle randomly
var beginQuiz = function () {
    firstPageEl.classList.add('hide');
    firstPageEl.classList.remove('show');
    questionsEl.classList.remove('hide');
    questionsEl.classList.add('show');
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
};

// set next quesitons and answers for quiz
var setQuestion = function () {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
};

// remove answer buttons.
var resetAnswers = function () {
    while (answerListEl.firstChild) {
        answerListEl.removeChild(answerListEl.firstChild)
    };
};

// display questions information and answer buttons.
var displayQuestion = function (index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerList = document.createElement('button')
        answerList.innerText = index.choices[i].choice
        answerList.classList.add('enter-btn')
        answerList.classList.add('answerbtn')
        answerList.addEventListener("click", answerCheck)
        answerListEl.appendChild(answerList)
    };
};

// display correct and inccorect outsomes on screen after questions are answered
var answerCorrect = function () {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        incorrectEl.classList.remove("banner")
        incorrectEl.classList.add("hide")
    };
};

var answerIncorrect = function () {
    if (incorrectEl.className = "hide") {
        incorrectEl.classList.remove("hide")
        incorrectEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")
    };
};

// variable and function for if anser is correct and incorrect.
var answerCheck = function (event) {
    var selectedanswer = event.target
    if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText) {
        answerCorrect()
        score = score + 7
    };
    else {
    answerIncorrect()
    score = score - 1;
    timeleft = timeleft - 3;
};

//varibale for going to next question and checking if more questions.
QuestionIndex++
if (arrayShuffledQuestions.length > QuestionIndex + 1) {
    setQuestion()
};
    else {
    gameover = "true";
    showScore();
};

// Display total score on screen after all questions are answered.
var showScore = function () {
    questionsEl.classList.add("hide");
    postQuizEl.classList.remove("hide");
    postQuizEl.classList.add("show");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
};

// make high score values.
var createNewScore = function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("Enter your intials!");
        return;
    };
    formInitials.reset();

    var HighScore = {
        initials: initials,
        score: score
    };

    // record scores.
    HighScores.push(HighScore);
    HighScores.sort((a, b) => { return b.score - a.score });

    // clear list of scores
    while (scoreListEl.firstChild) {
        scoreListEl.removeChild(scoreListEl.firstChild)
    };

    // save scores.
    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores));

        // upload values called to page.
        var loadNewScore = function () {
            var LoadedNewScore = localStorage.getItem("HighScores")
            if (!LoadedNewScore) {
                return false;
            };
            LoadedNewScore = JSON.parse(LoadedNewScore);
            LoadedNewScore.sort((a, b) => { return b.score - a.score });

            for (var i = 0; i < HighScores.length; i++) {
                var highscoreEl = document.createElement("li");
                highscoreEl.ClassName = "high-scores";
                highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
                scoreListEl.appendChild(highscoreEl);
            };
            saveHighScore();
            displayHighScores();
        };

        // display score screen from link/ when initals are entered.
        var displayHighScores = function () {
            championsEl.classList.remove("hide");
            championsEl.classList.add("show");
            gameover = "true"

            if (postQuizEl.className = "show") {
                postQuizEl.classList.remove("show");
                postQuizEl.classList.add("hide");
            };
            if (firstPageEl.className = "show") {
                firstPageEl.classList.remove("show");
                firstPageEl.classList.add("hide");
            };
            if (questionsEl.className = "show") {
                questionsEl.classList.remove("show");
                questionsEl.classList.add("hide");
            };
            if (correctEl.className = "show") {
                correctEl.classList.remove("show");
                correctEl.classList.add("hide");
            };
            if (incorrectEl.className = "show") {
                incorrectEl.classList.remove("show");
                incorrectEl.classList.add("hide");
            };
        };

        // clear high scores.
        var clearScores = function () {
            HighScores = [];
            while (scoreListEl.firstChild) {
                scoreListEl.removeChild(scoreListEl.firstChild);
            };
            localStorage.clear(HighScores);
        };
        loadHighScore()

        btnStartEl.addEventListener("click", beginQuiz);
        formInitials.addEventListener("submit", createHighScore);
        ViewHighScoreEl.addEventListener("click", displayHighScores);
        btnGoBackEl.addEventListener("click", renderStartPage);
        btnClearScoresEl.addEventListener("click", clearScores);



