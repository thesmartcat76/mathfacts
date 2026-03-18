getQuestion();
let qDiv = document.getElementById("questions");
let aContainer = document.getElementById("answersContainer");
let currentAnswer = '';
let questionIDX = 0;
let questionsArr = ['2+2', '3-3', '10+4', '8-2', '16+4', '20-5', '5+5', '12-6', '7+3', '15-7'];
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
}
function clearAnswer() {
    currentAnswer = '';
    document.getElementById('currentAnswer').innerHTML = '';
}
function checkAnswer() {
    let userAnswer = parseInt(currentAnswer);
    let correctAnswer = eval(questionsArr[questionIDX]);
    if (userAnswer == correctAnswer) {
        alert("Correct!");
        getQuestion(); // Automatically get new question
    } else {
        alert("Wrong! Try again.");
        clearAnswer();
    }
}
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendDigit(event.key);
    } else if (event.key === 'Enter') {
        checkAnswer();
    } else if (event.key === 'Backspace') {
        clearAnswer();
    }
    else if (event.key === ' ' || event.key === 'Spacebar') {
        getQuestion();
    }
});
