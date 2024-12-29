const skinTypeQuestions = [
    {
        question: "How does your skin feel after cleansing?",
        answers: [
            { text: "Tight and dry", type: "dry" },
            { text: "Normal and comfortable", type: "normal" },
            { text: "Still oily", type: "oily" },
            { text: "Tight in some areas, oily in others", type: "combination" }
        ]
    },
    {
        question: "How often does your face get shiny throughout the day?",
        answers: [
            { text: "Never", type: "dry" },
            { text: "Only after several hours", type: "normal" },
            { text: "Very often, especially in T-zone", type: "oily" },
            { text: "Only in T-zone area", type: "combination" }
        ]
    },
    {
        question: "What's your pore size?",
        answers: [
            { text: "Almost invisible", type: "dry" },
            { text: "Small but visible", type: "normal" },
            { text: "Large and visible", type: "oily" },
            { text: "Mixed - larger in T-zone, smaller on cheeks", type: "combination" }
        ]
    },
    {
        question: "How often do you experience breakouts?",
        answers: [
            { text: "Rarely", type: "dry" },
            { text: "Occasionally", type: "normal" },
            { text: "Frequently", type: "oily" },
            { text: "Mainly in T-zone", type: "combination" }
        ]
    }
];

let currentQuestionIndex = 0;
let skinTypeScores = {
    dry: 0,
    normal: 0,
    oily: 0,
    combination: 0
};

document.getElementById('startQuiz').addEventListener('click', startQuiz);
document.getElementById('nextQuestion').addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

function startQuiz() {
    document.getElementById('startQuiz').style.display = 'none';
    document.getElementById('nextQuestion').style.display = 'block';
    currentQuestionIndex = 0;
    skinTypeScores = { dry: 0, normal: 0, oily: 0, combination: 0 };
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    const nextButton = document.getElementById('nextQuestion');

    if (currentQuestionIndex >= skinTypeQuestions.length) {
        showResult();
        questionContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        nextButton.style.display = 'none';
        return;
    }

    const question = skinTypeQuestions[currentQuestionIndex];
    const answersHtml = question.answers
        .map(answer => `
            <button class="answer-btn" onclick="selectAnswer('${answer.type}')">
                ${answer.text}
            </button>
        `).join('');

    questionContainer.innerHTML = `
        <div class="question">
            <h3>Question ${currentQuestionIndex + 1}/${skinTypeQuestions.length}</h3>
            <p>${question.question}</p>
            ${answersHtml}
        </div>
    `;
}

function selectAnswer(type) {
    skinTypeScores[type]++;
    if (currentQuestionIndex < skinTypeQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const resultContainer = document.getElementById('result-container');
    const skinType = Object.entries(skinTypeScores).reduce((a, b) => 
        b[1] > a[1] ? b : a
    )[0];

    const recommendations = {
        dry: "Your skin is dry! Focus on hydrating ingredients like hyaluronic acid and ceramides. Avoid harsh cleansers and use a rich moisturizer.",
        normal: "You have normal skin! Maintain your skin's balance with gentle cleansers and lightweight moisturizers.",
        oily: "Your skin is oily! Look for non-comedogenic products and ingredients like niacinamide and salicylic acid.",
        combination: "You have combination skin! Use different products for different areas of your face - lighter products for T-zone and richer products for dry areas."
    };

    resultContainer.innerHTML = `
        <h3>Your Skin Type Result</h3>
        <p>${recommendations[skinType]}</p>
        <button class="btn btn-primary" onclick="startQuiz()">Retake Quiz</button>
    `;
    resultContainer.style.display = 'block';
    document.getElementById('nextQuestion').style.display = 'none';
}
