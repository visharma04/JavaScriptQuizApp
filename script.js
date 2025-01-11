const questions = [
    {
        question: "What is the full form of HTML?",
        answers: [
            { text: "Hyper Text Maker Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hydro Text Markup Language", correct: false },
            { text: "Hyper Text Mark Language", correct: false }
        ]
    },
    {
        question: "What is the full form of CPU?",
        answers: [
            { text: "Central Power Unit", correct: false },
            { text: "Center Power Unit", correct: false },
            { text: "Central Processing Unit", correct: true },
            { text: "Command Providing Unit", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function StartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
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

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // Highlight all buttons: green for correct, red for incorrect
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true; // Disable all buttons after selection
    });

    // Update score if the answer is correct
    if (isCorrect) {
        score++;
    }

    nextButton.style.display = "block"; // Show the Next button
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        alert(`Quiz finished! Your score: ${score}`);
        StartQuiz();
    }
});

StartQuiz();