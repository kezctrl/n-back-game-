// Elements
const splashScreen = document.getElementById('splash-screen');
const instructionsScreen = document.getElementById('instructions-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const letterDisplay = document.getElementById('letter-display');
const scoreDisplay = document.getElementById('score-display');
const progressDisplay = document.getElementById('progress-display');
const feedbackDisplay = document.getElementById('feedback');
const finalScore = document.getElementById('final-score');
const accuracyDisplay = document.getElementById('accuracy-display');
const playAgainBtn = document.getElementById('play-again-btn');

// Game variables
let currentLetterIndex = 0;
let letters = [];
let correctAnswers = 0;
let wrongAnswers = 0;
let streak = 0;
let totalAnswers = 0;
let intervalID;
const N_BACK = 2;
const LETTERS_COUNT = 20;
const INTERVAL = 1000; // 1 second

// Generate random letter sequence
function generateLetters() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    letters = Array.from({ length: LETTERS_COUNT }, () => alphabet[Math.floor(Math.random() * 26)]);
}

// Display a letter and set interval for the game loop
function startGame() {
    currentLetterIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    streak = 0;
    totalAnswers = 0;
    scoreDisplay.textContent = `Score: ${correctAnswers}`;
    progressDisplay.textContent = `Progress: 0%`;
    feedbackDisplay.textContent = '';
    generateLetters();
    
    gameScreen.style.display = 'block';
    intervalID = setInterval(showNextLetter, INTERVAL);
}

// Show the next letter in sequence
function showNextLetter() {
    if (currentLetterIndex >= letters.length) {
        endGame();
        return;
    }
    letterDisplay.textContent = letters[currentLetterIndex];
    feedbackDisplay.textContent = '';  // Reset feedback
    letterDisplay.style.color = 'white';  // Reset letter color
    updateProgress();
    currentLetterIndex++;
}

// Update progress percentage
function updateProgress() {
    const progress = Math.round((currentLetterIndex / LETTERS_COUNT) * 100);
    progressDisplay.textContent = `Progress: ${progress}%`;
}

// Check if the user input is correct
function checkAnswer(isTrue) {
    totalAnswers++;
    if (currentLetterIndex > N_BACK) {
        const isMatch = letters[currentLetterIndex - 1] === letters[currentLetterIndex - 1 - N_BACK];
        if (isMatch === isTrue) {
            correctAnswers++;
            streak++;
            if (streak % 3 === 0) {
                correctAnswers += 2;  // Bonus for streaks
            }
            feedbackDisplay.textContent = 'Correct!';
            letterDisplay.style.color = '#32cd32';  // LimeGreen for correct
        } else {
            wrongAnswers++;
            streak = 0;
            feedbackDisplay.textContent = 'Wrong!';
            letterDisplay.style.color = '#ff4500';  // OrangeRed for wrong
        }
        scoreDisplay.textContent = `Score: ${correctAnswers}`;
    }
}

// End the game and show result
function endGame() {
    clearInterval(intervalID);
    gameScreen.style.display = 'none';
    resultScreen.style.display = 'block';

    const accuracy = Math.round((correctAnswers / totalAnswers) * 100);
    finalScore.textContent = `Final Score: ${correctAnswers}`;
    accuracyDisplay.textContent = `Accuracy: ${accuracy}% (${correctAnswers}/${totalAnswers})`;
}

// Event listeners
document.addEventListener('keydown', (event) => {
    if (splashScreen.style.display !== 'none') {
        splashScreen.style.display = 'none';
        instructionsScreen.style.display = 'block';
    } else if (instructionsScreen.style.display !== 'none') {
        instructionsScreen.style.display = 'none';
        startGame();
    } else if (gameScreen.style.display !== 'none') {
        if (event.key === 't' || event.key === 'T') {
            checkAnswer(true);
        } else if (event.key === 'f' || event.key === 'F') {
            checkAnswer(false);
        }
    }
});

playAgainBtn.addEventListener('click', () => {
    resultScreen.style.display = 'none';
    splashScreen.style.display = 'block';
});
