// Base de données des niveaux (Ajoute tes 500 niveaux ici)
const levelsData = [
    {
        level: 1,
        questions: [
            { q: "Quelle est la capitale de la France ?", r: ["Lyon", "Paris", "Marseille", "Lille"], correct: 1 },
            { q: "Combien font 2 + 2 ?", r: ["3", "4", "5", "6"], correct: 1 },
            { q: "Couleur du cheval blanc d'Henri IV ?", r: ["Noir", "Blanc", "Gris", "Marron"], correct: 1 },
            { q: "L'inverse de 'Haut' ?", r: ["Gauche", "Bas", "Droite", "Milieu"], correct: 1 },
            { q: "Cri du chat ?", r: ["Aboiement", "Miaulement", "Rugissement", "Bêlement"], correct: 1 }
        ]
    },
    {
        level: 2,
        questions: [
            { q: "Planète rouge ?", r: ["Vénus", "Mars", "Jupiter", "Saturne"], correct: 1 },
            { q: "Roi de la jungle ?", r: ["Tigre", "Lion", "Éléphant", "Girafe"], correct: 1 },
            { q: "Nombre de continents ?", r: ["5", "6", "7", "8"], correct: 2 },
            { q: "Métal précieux ?", r: ["Fer", "Or", "Plomb", "Cuivre"], correct: 1 },
            { q: "Capitale de l'Espagne ?", r: ["Madrid", "Barcelone", "Séville", "Valence"], correct: 0 }
        ]
    }
    // Continue jusqu'au niveau 500...
];

let currentLevelIdx = 0;
let currentQuestionIdx = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionCounter = document.getElementById("question-counter");
const resultScreen = document.getElementById("result-screen");
const gameZone = document.getElementById("game-zone");

function loadQuestion() {
    const level = levelsData[currentLevelIdx];
    const qData = level.questions[currentQuestionIdx];

    questionCounter.innerText = `Question ${currentQuestionIdx + 1} / 5`;
    questionText.innerText = qData.q;
    optionsContainer.innerHTML = "";

    qData.r.forEach((choice, index) => {
        const btn = document.createElement("button");
        btn.innerText = choice;
        btn.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(choiceIdx) {
    const correctIdx = levelsData[currentLevelIdx].questions[currentQuestionIdx].correct;
    if (choiceIdx === correctIdx) score++;

    currentQuestionIdx++;
    if (currentQuestionIdx < 5) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    gameZone.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    
    if (score >= 4) { // Réussite si 4/5 bonnes réponses
        document.getElementById("result-title").innerText = "Niveau Réussi ! (" + score + "/5)";
        document.getElementById("next-btn").classList.remove("hidden");
        document.getElementById("retry-btn").classList.add("hidden");
    } else {
        document.getElementById("result-title").innerText = "Échec ! (" + score + "/5)";
        document.getElementById("next-btn").classList.add("hidden");
        document.getElementById("retry-btn").classList.remove("hidden");
    }
}

function nextLevel() {
    currentLevelIdx++;
    restartLevel();
    document.getElementById("level-display").innerText = `Niveau : ${currentLevelIdx + 1} / 500`;
}

function restartLevel() {
    currentQuestionIdx = 0;
    score = 0;
    gameZone.classList.remove("hidden");
    resultScreen.classList.add("hidden");
    loadQuestion();
}

// Lancement initial
loadQuestion();
