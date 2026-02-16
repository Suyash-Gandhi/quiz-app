const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"],
        answer: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: 3
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next');
const resultEl = document.getElementById('result');

function loadQuestion() {
    answered = false;
    nextBtn.style.display = 'none';
    const q = questions[currentQuestion];
    questionEl.textContent = `Question ${currentQuestion + 1}: ${q.question}`;
    optionsEl.innerHTML = '';
    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.textContent = option;
        div.onclick = () => selectOption(index);
        optionsEl.appendChild(div);
    });
}

function selectOption(selected) {
    if (answered) return;
    answered = true;
    const options = document.querySelectorAll('.option');
    const correct = questions[currentQuestion].answer;
    
    options[selected].classList.add(selected === correct ? 'correct' : 'wrong');
    options[correct].classList.add('correct');
    
    if (selected === correct) score++;
    
    nextBtn.style.display = 'block';
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    nextBtn.style.display = 'none';
    resultEl.style.display = 'block';
    resultEl.innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Your Score: ${score}/${questions.length}</p>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}

loadQuestion();
