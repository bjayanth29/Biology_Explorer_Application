/* script.js - handles navigation, theme, quiz logic, and small UI behaviors */

/* === Data: full quiz questions ===
   (kept from your original set - expand / reduce as desired) */
const quizQuestions = [
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
    correct: 1,
    explanation:
      "Mitochondria produce ATP via cellular respiration. The nucleus contains DNA; ribosomes make proteins; chloroplasts do photosynthesis."
  },
  {
    question: "Which blood group is known as the universal donor?",
    options: ["A+", "B+", "AB+", "O-"],
    correct: 3,
    explanation:
      "O- lacks A, B and Rh antigens, so it can be donated to most recipients without antigen mismatch."
  },
  {
    question: "The process by which plants make their own food using sunlight is called:",
    options: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"],
    correct: 1,
    explanation:
      "Photosynthesis converts CO₂ and H₂O + light into glucose and oxygen."
  },
  {
    question: "Which vitamin is produced when skin is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
    correct: 2,
    explanation:
      "Vitamin D is synthesized in the skin under UVB exposure and is important for calcium homeostasis."
  },
  {
    question: "What is the basic unit of heredity?",
    options: ["Cell", "Chromosome", "Gene", "DNA"],
    correct: 2,
    explanation:
      "A gene (segment of DNA) is the functional unit of heredity, carried on chromosomes."
  },
  {
    question: "Which part of the brain controls balance and coordination?",
    options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
    correct: 1,
    explanation:
      "The cerebellum coordinates movement, balance and posture."
  },
  {
    question: "The smallest bone in the human body is located in the:",
    options: ["Ear", "Nose", "Finger", "Toe"],
    correct: 0,
    explanation:
      "The stapes (in the middle ear) is the smallest bone."
  },
  {
    question: "Which type of blood cells help in clotting of blood?",
    options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
    correct: 2,
    explanation:
      "Platelets (thrombocytes) aggregate to form clots at injury sites."
  },
  {
    question: "The exchange of gases in plants occurs through tiny pores called:",
    options: ["Stomata", "Lenticels", "Xylem", "Phloem"],
    correct: 0,
    explanation:
      "Stomata on leaves allow CO₂ in and O₂ out; guard cells regulate opening."
  },
  {
    question: "Which of the following is NOT a characteristic of living organisms?",
    options: ["Growth", "Reproduction", "Metabolism", "Rusting"],
    correct: 3,
    explanation:
      "Rusting is a chemical process that happens to metals, not a life characteristic."
  },
  {
    question: "The pH of human blood is approximately:",
    options: ["6.5 (acidic)", "7.4 (slightly alkaline)", "8.5 (alkaline)", "5.5 (acidic)"],
    correct: 1,
    explanation:
      "Normal blood pH is ~7.35–7.45; values outside that range are abnormal."
  },
  {
    question: "Which gland is known as the 'master gland'?",
    options: ["Thyroid gland", "Pituitary gland", "Adrenal gland", "Pancreas"],
    correct: 1,
    explanation:
      "The pituitary secretes hormones that regulate other endocrine glands."
  },
  {
    question: "The longest bone in the human body is:",
    options: ["Tibia", "Fibula", "Femur", "Humerus"],
    correct: 2,
    explanation:
      "The femur (thigh bone) is the longest bone."
  },
  {
    question: "Which organ purifies blood in the human body?",
    options: ["Heart", "Liver", "Kidney", "Lungs"],
    correct: 2,
    explanation:
      "Kidneys filter blood to remove waste and produce urine."
  },
  {
    question: "The normal body temperature of a healthy human is:",
    options: ["35°C", "37°C", "39°C", "40°C"],
    correct: 1,
    explanation:
      "Normal temperature ≈ 37°C (98.6°F)."
  },
  {
    question: "Which cell organelle is known as the 'suicide bag'?",
    options: ["Mitochondria", "Ribosome", "Lysosome", "Golgi body"],
    correct: 2,
    explanation:
      "Lysosomes contain digestive enzymes; their rupture can lead to autolysis."
  },
  {
    question: "The pigment that gives blood its red color is:",
    options: ["Chlorophyll", "Melanin", "Hemoglobin", "Carotene"],
    correct: 2,
    explanation:
      "Hemoglobin in red blood cells contains iron and binds oxygen, giving the red color."
  },
  {
    question: "Which is the largest organ in the human body?",
    options: ["Liver", "Brain", "Skin", "Heart"],
    correct: 2,
    explanation:
      "Skin is the largest organ by surface area and weight."
  },
  {
    question: "The functional unit of the kidney is called:",
    options: ["Neuron", "Nephron", "Alveolus", "Villi"],
    correct: 1,
    explanation:
      "Each nephron filters blood and forms urine."
  },
  {
    question: "Which hormone regulates blood sugar levels?",
    options: ["Thyroxine", "Insulin", "Adrenaline", "Estrogen"],
    correct: 1,
    explanation:
      "Insulin lowers blood glucose by promoting uptake into cells."
  }
];

/* === Navigation and UI wiring === */
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileToggle = document.getElementById('mobileToggle');
const navLinksContainer = document.getElementById('navLinks');
const logoBtn = document.getElementById('logoBtn');
const actionButtons = document.querySelectorAll('[data-action="goto"]');

function showPage(name) {
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(name);
  if (target) target.classList.add('active');

  // If quiz page opened, initialize quiz
  if (name === 'quiz') {
    restartQuiz();
  }

  // close mobile menu if open
  navLinksContainer.classList.remove('active');
  window.scrollTo(0, 0);
}

/* Link clicks */
navLinks.forEach(link => {
  const t = link.dataset.target;
  link.addEventListener('click', () => showPage(t));
});

/* logo */
logoBtn.addEventListener('click', () => showPage('home'));

/* mobile menu */
mobileToggle.addEventListener('click', () => navLinksContainer.classList.toggle('active'));

/* cta buttons */
actionButtons.forEach(btn => {
  btn.addEventListener('click', () => showPage(btn.dataset.target));
});

/* keyboard-friendly: allow Enter/Space on nav items */
navLinks.forEach(a => {
  a.setAttribute('tabindex', '0');
  a.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showPage(a.dataset.target);
    }
  });
});

/* === Theme handling: respects localStorage and system preference === */
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
  }
}

/* Determine default theme:
   - If user set in localStorage, use that.
   - Else use system preference: prefers-color-scheme */
function loadTheme() {
  const saved = localStorage.getItem('theme'); // 'light' or 'dark'
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }
}

themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

/* React to system preference changes to keep in sync (only when user hasn't chosen) */
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });
}

/* === Quiz Logic === */
const totalQuestionsEl = document.getElementById('totalQuestions');
const currentQuestionEl = document.getElementById('currentQuestion');
const scoreEl = document.getElementById('score');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const questionContainer = document.getElementById('questionContainer');
const resultContainer = document.getElementById('resultContainer');
const finalScoreEl = document.getElementById('finalScore');
const resultMessageEl = document.getElementById('resultMessage');
const tryAgainBtn = document.getElementById('tryAgain');
const goHomeBtn = document.getElementById('goHome');
const progressBar = document.getElementById('progressBar');

let currentQuestionIndex = 0;
let userScore = 0;
let answered = false;

function loadQuestion() {
  answered = false;
  const q = quizQuestions[currentQuestionIndex];

  currentQuestionEl.textContent = currentQuestionIndex + 1;
  totalQuestionsEl.textContent = quizQuestions.length;
  scoreEl.textContent = userScore;
  questionEl.textContent = q.question;

  optionsEl.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const div = document.createElement('div');
    div.className = 'quiz-option';
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');
    div.textContent = opt;
    div.addEventListener('click', () => checkAnswer(idx, div));
    div.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') checkAnswer(idx, div);
    });
    optionsEl.appendChild(div);
  });

  nextButton.style.display = 'none';
  updateProgressBar();
}

function checkAnswer(selectedIndex, element) {
  if (answered) return;
  answered = true;

  const q = quizQuestions[currentQuestionIndex];
  const optionDivs = [...document.querySelectorAll('.quiz-option')];
  optionDivs.forEach(d => d.classList.add('disabled'));

  if (selectedIndex === q.correct) {
    element.classList.add('correct');
    element.textContent = '✓ ' + element.textContent;
    userScore++;
    scoreEl.textContent = userScore;
  } else {
    element.classList.add('incorrect');
    element.textContent = '✗ ' + element.textContent;
    const correctEl = optionDivs[q.correct];
    if (correctEl) {
      correctEl.classList.add('correct');
      correctEl.textContent = '✓ ' + correctEl.textContent;
    }
  }

  // explanation box
  const explanationDiv = document.createElement('div');
  explanationDiv.className = 'explanation-box';
  explanationDiv.innerHTML = `
    <div class="explanation-title">${selectedIndex === q.correct ? 'Correct!' : 'Learn from this:'}</div>
    <div class="explanation-text">${q.explanation}</div>
  `;
  // insert explanation and show next
  questionContainer.appendChild(explanationDiv);
  nextButton.style.display = 'block';
  nextButton.focus();
}

function nextQuestion() {
  // remove explanation if present
  const expl = document.querySelector('.explanation-box');
  if (expl) expl.remove();

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  questionContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  finalScoreEl.textContent = `🎯 ${userScore}/${quizQuestions.length}`;
  const pct = (userScore / quizQuestions.length) * 100;
  let msg = '';
  if (pct === 100) msg = "🎉 Perfect Score! You're a biology expert!";
  else if (pct >= 80) msg = "👏 Excellent work! You know your biology!";
  else if (pct >= 60) msg = "👍 Good job! Keep studying!";
  else msg = "📚 Keep learning! Biology is fascinating!";
  resultMessageEl.textContent = msg;
  updateProgressBar(true);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  answered = false;
  questionContainer.style.display = 'block';
  resultContainer.style.display = 'none';
  loadQuestion();
}

/* Progress bar updates */
function updateProgressBar(final = false) {
  if (final) {
    progressBar.style.width = '100%';
    return;
  }
  const pct = ((currentQuestionIndex) / quizQuestions.length) * 100;
  progressBar.style.width = `${pct}%`;
}

/* Buttons wiring */
nextButton.addEventListener('click', nextQuestion);
tryAgainBtn.addEventListener('click', restartQuiz);
goHomeBtn.addEventListener('click', () => showPage('home'));

/* initialize */
window.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  // show home by default
  showPage('home');

  // if user immediately navigates to quiz via hash or other means later, manual init occurs in showPage
});
