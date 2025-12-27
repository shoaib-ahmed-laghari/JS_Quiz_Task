// ... (Aapka poora JavaScript code yahan pe paste kar dein, woh bilkul perfect hai) ...
const quizData = [
    { q: "What does HTML stand for?", o: ["Hyper Text Markup Language", "High Tech Machine Language", "Hyper Tool Multi Language", "None of these"], a: 0 },
    { q: "Which is the modern way to declare a variable in JavaScript?", o: ["var", "let/const", "dim", "variable"], a: 1 },
    { q: "What is used to select an 'id' in CSS?", o: [".", "&", "#", "*"], a: 2 },
    { q: "What is React JS?", o: ["Database", "Library", "Language", "Browser"], a: 1 },
    { q: "What is the full form of HTTP?", o: ["Hyper Transfer Text Protocol", "Hyper Text Transfer Protocol", "High Transfer Tech Protocol", "None"], a: 1 },
    { q: "At what index does an Array start?", o: ["1", "0", "-1", "Anywhere"], a: 1 },
    { q: "How do you write a comment in Python?", o: ["//", "/* */", "#", ""], a: 2 },
    { q: "What is the primary use of SQL?", o: ["Styling", "Database Management", "Networking", "Graphics"], a: 1 },
    { q: "What is GitHub?", o: ["Compiler", "Version Control Hosting", "Text Editor", "Operating System"], a: 1 },
    { q: "What is the main purpose of an API?", o: ["Styling", "Data Communication", "Image Editing", "Storage"], a: 1 },
    { q: "In CSS Flexbox, what does 'justify-content: center' do?", o: ["Vertical alignment", "Horizontal alignment", "Change color", "Font size"], a: 1 },
    { q: "What type of database is MongoDB?", o: ["Relational", "NoSQL", "Excel", "Flat File"], a: 1 },
    { q: "What is the primary use of Bootstrap?", o: ["Backend", "Responsive UI", "Animation", "Security"], a: 1 },
    { q: "What does JSON stand for?", o: ["Java Simple Object Notation", "JavaScript Object Notation", "Just Simple Object Net", "None"], a: 1 },
    { q: "Where does PHP code execute?", o: ["Client side", "Server side", "Browser", "Mobile"], a: 1 },
    { q: "Which engine powers Google Chrome?", o: ["Gecko", "WebKit", "V8 / Blink", "Trident"], a: 2 },
    { q: "What is Node.js?", o: ["JS Framework", "JS Runtime Environment", "JS Library", "Programming Language"], a: 1 },
    { q: "Which tag is used for a line break in HTML?", o: ["<break>", "<lb>", "<br>", "<hr>"], a: 2 },
    { q: "What is Sass (SCSS)?", o: ["Database", "CSS Preprocessor", "JS Framework", "Backend"], a: 1 },
    { q: "What is Docker primarily used for?", o: ["Coding", "Containerization", "Designing", "Testing"], a: 1 },
    { q: "What is Tailwind CSS?", o: ["JS Library", "Utility-first CSS Framework", "Backend Framework", "Database"], a: 1 },
    { q: "What is the difference between '===' and '==' in JavaScript?", o: ["No difference", "Value & Type check", "Only Type check", "None"], a: 1 },
    { q: "What does SEO stand for?", o: ["Search Engine Optimization", "Select Every Option", "System Engine Order", "None"], a: 0 },
    { q: "What is TypeScript?", o: ["New Language", "JavaScript Superset", "CSS Framework", "Browser"], a: 1 },
    { q: "What does URL stand for?", o: ["Uniform Resource Locator", "Unique Resource Link", "Universal Radio Loop", "None"], a: 0 }
];

let currentIdx = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startTimer() {
    timeLeft = 15;
    document.getElementById('timer').innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNext();
        }
    }, 1000);
}

function loadQuestion() {
    if (currentIdx >= quizData.length) return showResults();
    startTimer();
    const data = quizData[currentIdx];
    document.getElementById('count-text').innerText = `${currentIdx + 1}/${quizData.length}`;
    document.getElementById('progress').style.width = `${((currentIdx) / quizData.length) * 100}%`;
    document.getElementById('question-text').innerText = data.q;
    const optionsCont = document.getElementById('options-container');
    optionsCont.innerHTML = '';
    data.o.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.innerHTML = `<span>${opt}</span>`;
        btn.onclick = () => checkAnswer(i, btn);
        optionsCont.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    clearInterval(timer);
    const correct = quizData[currentIdx].a;
    const allBtns = document.querySelectorAll('.opt-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');
    if (selected === correct) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        allBtns[correct].classList.add('correct');
    }
    setTimeout(handleNext, 1200);
}

function handleNext() {
    currentIdx++;
    loadQuestion();
}

function showResults() {
    const container = document.getElementById('quiz-container');
    const percentage = Math.round((score / quizData.length) * 100);
    container.innerHTML = `
                <div class="result-screen">
                    <h2 style="color: var(--primary)">Mission Accomplished!</h2>
                    <div class="score-circle">${percentage}%</div>
                    <p style="font-size: 1.3rem">System accuracy: <b>${score}</b> / ${quizData.length}</p>
                    <p style="color: var(--text-dim)">${percentage > 70 ? 'You are a Senior Architect! 💎' : 'Junior level detected. Keep coding!'}</p>
                    <button class="btn-restart" onclick="location.reload()">Re-Initialize System</button>
                </div>
            `;
}
loadQuestion();