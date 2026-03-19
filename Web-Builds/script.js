let qDiv = document.getElementById("questions");
let aContainer = document.getElementById("answersContainer");
let currentAnswer = '';
let questionIDX = 0;
let questionsArr = ['2+2', '3-3', '10+4', '8-2', '16+4', '20-5', '5+5', '12-6', '7+3', '15-7'];
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getQuestion() {
    questionIDX = Math.floor(Math.random() * questionsArr.length);
    if (questionIDX < questionsArr.length) {
        qDiv.innerHTML = questionsArr[questionIDX];
        currentAnswer = '';
        document.getElementById('currentAnswer').innerHTML = '';
    } else {
        qDiv.innerHTML = "No more questions!";
    }
}
function appendDigit(digit) {
    currentAnswer += digit;
    document.getElementById('currentAnswer').innerHTML = currentAnswer;
    sleep(4500).then(() => {
        if (parseInt(currentAnswer) == eval(questionsArr[questionIDX])) {
            checkAnswer();
        } else if (currentAnswer.length >= 3) {
            qDiv.innerHTML = "Wrong! Try again.";
            sleep(3000).then(() => {
                clearAnswer();
                getQuestion(); // Automatically get new question
            });
        }
    });
}
function clearAnswer() {
    currentAnswer = '';
    document.getElementById('currentAnswer').innerHTML = '';
}
let correctAnswer = null;
let userAnswer = null;
function checkAnswer() {
    correctAnswer = eval(questionsArr[questionIDX]);
    userAnswer = parseInt(currentAnswer);
    if (userAnswer == correctAnswer) {
        clearAnswer();
        qDiv.innerHTML = 'Correct! 🎉 🥳 🎉';
        sleep(3000).then(() => {
            getQuestion(); // Automatically get new question
        });
    } else {
        qDiv.innerHTML = "Wrong! Try again.";
        clearAnswer();
    }
}
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendDigit(event.key);
        if (parseInt(currentAnswer) == eval(questionsArr[questionIDX])) {
            checkAnswer();
        } else if (currentAnswer.length >= 3) {
            qDiv.innerHTML = "Wrong! Try again.";
            sleep(3000).then(() => {
                clearAnswer();
                getQuestion(); // Automatically get new question
            });
        }
    }else if (event.key === 'backspace') {
        clearAnswer();
    }
});

getQuestion();
function generatequestions() {
    let operations = ['+', '-'];
    for (let i = 0; i < 10; i++) {
        let num1 = Math.floor(Math.random() * 20) + 1;
        let num2 = Math.floor(Math.random() * 20) + 1;
        let op = operations[Math.floor(Math.random() * operations.length)];
        questionsArr.push(`${num1} ${op} ${num2}`);
    }
}
for (let i = 0; i < Math.floor(Math.random()* 10) - 5; i++) {
    generatequestions();
}
let running = true
while (running) {
    sleep(1000).then(() => {
        if(userAnswer === '') {
        checkAnswer();
    }
});
}