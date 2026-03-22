const qDiv = document.getElementById("questions");
const currentAnswerDiv = document.getElementById("currentAnswer");

let currentAnswer = '';
let questionIDX = 0;
let pendingTimer = null;
let questionsArr = ['2+2', '3-3', '10+4', '8-2', '16+4', '20-5', '5+5', '12-6', '7+3', '15-7'];

// Safe math evaluator — no eval()
function safeCalc(expr) {
    const match = expr.trim().match(/^(-?\d+)\s*([+\-])\s*(\d+)$/);
    if (!match) return NaN;
    const [, a, op, b] = match;
    return op === '+' ? +a + +b : +a - +b;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function cancelPending() {
    if (pendingTimer !== null) {
        clearTimeout(pendingTimer);
        pendingTimer = null;
    }
}

function getQuestion() {
    cancelPending();
    questionIDX = Math.floor(Math.random() * questionsArr.length);
    qDiv.textContent = questionsArr[questionIDX];
    currentAnswer = '';
    currentAnswerDiv.textContent = '';
}

function appendDigit(digit) {
    currentAnswer += digit;
    currentAnswerDiv.textContent = currentAnswer;

    const correct = safeCalc(questionsArr[questionIDX]);

    // Auto-submit once the answer is long enough to be correct
    if (+currentAnswer === correct) {
        cancelPending();
        pendingTimer = setTimeout(checkAnswer, 300);
    } else if (currentAnswer.length >= String(Math.abs(correct) + 20).length || currentAnswer.length >= 3) {
        cancelPending();
        pendingTimer = setTimeout(() => {
            qDiv.textContent = "Wrong! Try again.";
            pendingTimer = setTimeout(() => {
                clearAnswer();
                getQuestion();
            }, 2000);
        }, 200);
    }
}

function clearAnswer() {
    currentAnswer = '';
    currentAnswerDiv.textContent = '';
}

function checkAnswer() {
    cancelPending();
    const correct = safeCalc(questionsArr[questionIDX]);
    const user = parseInt(currentAnswer, 10);

    if (user === correct) {
        clearAnswer();
        qDiv.textContent = 'Correct! 🎉 🥳 🎉';
        pendingTimer = setTimeout(getQuestion, 2500);
    } else {
        qDiv.textContent = "Wrong! Try again.";
        clearAnswer();
        pendingTimer = setTimeout(getQuestion, 2000);
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key >= '0' && event.key <= '9') {
        appendDigit(event.key);
    } else if (event.key === 'Backspace') {
        clearAnswer();
    } else if (event.key === 'Enter') {
        checkAnswer();
    }
});

function generateQuestions(count) {
    const ops = ['+', '-'];
    for (let i = 0; i < count; i++) {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const op = ops[Math.floor(Math.random() * ops.length)];
        if (num1 - num2 < 0 && op === '-') {
            generateQuestions(1); // Avoid negative results for subtraction
            return;
        }else if (num1 + num2 > 20 && op === '+') {
            generateQuestions(1); // Avoid excessively large results for addition
            return;
        }else {
        questionsArr.push(`${num1}${op}${num2}`);
    }
}
}

// Generate a fixed, sensible number of extra questions (was broken: random could be negative)
generateQuestions(10);

getQuestion();