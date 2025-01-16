const question = [
    {
        question: "What is the national animal of India?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Bengal Tiger", correct: true },
            { text: "Horse", correct: false },
            { text: "Dog", correct: false }
        ]
    },
    {
        question: "What is the official currency of India?",
        answers: [
            { text: "Euro", correct: false },
            { text: "Dollar", correct: false },
            { text: "Indian Rupee", correct: true },
            { text: "Vhon", correct: false }
        ]
    },
    {
        question: "In which year did India gain independence?",
        answers: [
            { text: "1945", correct: false },
            { text: "1950", correct: false },
            { text: "1946", correct: false },
            { text: "1947", correct: true }
        ]
    },
    {
        question: "Which is the largest state in India by area?",
        answers: [
            { text: "Rajasthan", correct: true },
            { text: "Maharashtra", correct: false },
            { text: "Kerala", correct: false },
            { text: "Tamilnadu", correct: false }
        ]
    },
    {
        question: "Who wrote the Indian national anthem?",
        answers: [
            { text: "Chamar king Babasaheb", correct: false },
            { text: "Rabindranath Tagore", correct: true },
            { text: "Mahatma Gandhi", correct: false },
            { text: "Jawaharlal Nehru", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionindex = 0;
let score = 0;

function startQuiz() {
    currentQuestionindex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetstate();
    let currentQuestion = question[currentQuestionindex];
    let questionNo = currentQuestionindex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetstate() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionindex < question.length - 1) {
        currentQuestionindex++;
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetstate();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
