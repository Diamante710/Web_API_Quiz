var currentQuestionIndex = 0;
var time = questions.length * 5;
var timerId;
var timerEl = document.getElementById('time');

var questionsEl = document.getElementById('questions');
var choicesEl = document.getElementById('choices');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

var startBtnEl = document.getElementById('start');
var submitBtnEl = document.getElementById('submit');

var correctAns = 0;

function beginQuiz() {

    var startPageEl = document.getElementById('start-page');
    startPageEl.setAttribute('class', 'hide');
    questionsEl.removeAttribute('class');
    timerId = setInterval(clock, 1000);
    timerEl.textContent = time;

    startQuestions();
}

function startQuestions() {
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = '';

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);
        choiceNode.textContent = i + 1 + '. ' + choice;
        choicesEl.appendChild(choiceNode);
    }
}

function questionClick(event) {
    var buttonEl = event.target;

    if (!buttonEl.matches('.choice')) {
        correctAns++;
    }

    if (buttonEl.value !== questions[currentQuestionIndex].answer) {
        time -= 5;

        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = 'You Are Incorrect!';

    } else {
        feedbackEl.textContent = 'You Are Correct!';
    }

    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);

    currentQuestionIndex++;

    if (time <= 0 || currentQuestionIndex === questions.length) {
        endQuiz();

    } else {
        startQuestions();
    }
}

function endQuiz() {
    clearInterval(timerId);
  
    var postQuizEl = document.getElementById('post-quiz');
    postQuizEl.removeAttribute('class');

    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
    questionsEl.setAttribute('class', 'hide');
  }
  
  function clock() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
      endQuiz();
    }
  }

  function saveHighscore() {
    var initials = initialsEl.value.trim();
  
    if (initials !== '') {
      var highscores =
        JSON.parse(window.localStorage.getItem('highscores')) || [];

      var newScore = {
        score: time,
        initials: initials,
      };

      highscores.push(newScore);
      window.localStorage.setItem('highscores', JSON.stringify(highscores));
      window.location.href = 'highscores.html';
    }
  }

  function checkForEnter(event) {
    if (event.key === 'Enter') {
      saveHighscore();
    }
  }

  submitBtnEl.onclick = saveHighscore;
  startBtnEl.onclick = beginQuiz;
  choicesEl.onclick = questionClick;
  initialsEl.onkeyup = checkForEnter;
  