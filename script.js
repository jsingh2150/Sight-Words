/* =========================================
   GURMUKHI ALPHABET / SIGHT WORDS
========================================= */

const gurmukhiLetters = [
    "Way", "These", "Them", "Our", "His", "All", "With", "Little", "We", "White",
    "Place", "Then", "New", "Saw", "One", "Her", "Two", "Jump", "Down", "Out",
    "Come", "Do", "Good", "Blue", "Day", "Four", "Has", "Eat", "Water", "From",
    "Brown", "Which", "Yellow", "By", "This", "What", "Some", "Here", "Pretty", "Will",
    "Many", "Can", "Go", "You", "Like", "To", "My", "And", "About", "Are",
    "Please", "May", "Or", "Does", "Who", "That", "Away", "How", "Each", "Where",
    "Is", "Play", "Too", "Help", "Me", "Want", "Said", "Have", "They", "Of",
    "For", "Was", "She", "A", "The", "See", "Could", "I", "Look", "He",
    "Under", "Long", "Say", "Now", "Than", "When"
];

/* =========================================
   STATE MANAGEMENT
========================================= */

let letters = [...gurmukhiLetters];
let currentIndex = 0;

let completedLetters = new Set();
let flaggedLetters = new Set();
let isReviewingFlaggedMode = false;

const COMPLETE_MESSAGE = "🎉 Complete";

/* =========================================
   HTML ELEMENTS
========================================= */

const card = document.getElementById("card");
const flagBtn = document.getElementById("flagBtn");
const cardNumber = document.getElementById("cardNumber");
const counter = document.getElementById("counter");
const progressBar = document.getElementById("progressBar");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const randomBtn = document.getElementById("randomBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const reviewFlaggedBtn = document.getElementById("reviewFlaggedBtn");
const resetBtn = document.getElementById("resetBtn");

/* =========================================
   HELPER FUNCTIONS
========================================= */

function isCompleteCard() {
    return currentIndex >= letters.length;
}

function completeCurrentLetter() {
    if (isCompleteCard()) return;
    const letter = letters[currentIndex];
    completedLetters.add(letter);
}

function updateCardNumber() {
    const totalCards = letters.length + 1;
    if (isCompleteCard()) {
        cardNumber.textContent = `Card ${totalCards} of ${totalCards}`;
        return;
    }
    cardNumber.textContent = `Card ${currentIndex + 1} of ${letters.length}`;
}

function updateCounter() {
    const completed = completedLetters.size;
    const total = letters.length;
    const remaining = total - completed;

    if (completed === total && total > 0) {
        counter.textContent = `🎉 All ${total} items completed!`;
        counter.style.color = "#16a34a";
    } else {
        counter.textContent = `${completed} completed • ${flaggedLetters.size} flagged • ${remaining} remaining`;
        counter.style.color = "#4b5563";
    }

    const percentage = total > 0 ? (completed / total) * 100 : 0;
    progressBar.style.width = `${percentage}%`;

    if (reviewFlaggedBtn) {
        reviewFlaggedBtn.textContent = isReviewingFlaggedMode
            ? "📚 Show All Words"
            : `🚩 Review Flagged (${flaggedLetters.size})`;
    }
}

/* =========================================
   UPDATE CARD VIEW
========================================= */

function updateCard() {
    card.style.opacity = "0";
    card.style.transform = "scale(0.85)";

    setTimeout(() => {
        if (isCompleteCard()) {
            card.textContent = COMPLETE_MESSAGE;
            card.style.background = "#22c55e";
            card.style.color = "white";
            card.classList.remove("is-flagged");
            if (flagBtn) flagBtn.style.display = "none";
        } else {
            const currentItem = letters[currentIndex];
            card.textContent = currentItem;
            card.style.background = "white";
            card.style.color = "#111827";

            if (flagBtn) {
                flagBtn.style.display = "inline-block";
                if (flaggedLetters.has(currentItem)) {
                    card.classList.add("is-flagged");
                    flagBtn.classList.add("active");
                    flagBtn.textContent = "🚩 Flagged";
                } else {
                    card.classList.remove("is-flagged");
                    flagBtn.classList.remove("active");
                    flagBtn.textContent = "🏳️ Flag for Review";
                }
            }
        }

        card.style.opacity = "1";
        card.style.transform = "scale(1)";

        updateCardNumber();
        updateCounter();
    }, 120);
}

/* =========================================
   FLAGGING CONTROLS
========================================= */

function toggleFlag() {
    if (isCompleteCard() || letters.length === 0) return;

    const currentItem = letters[currentIndex];
    if (flaggedLetters.has(currentItem)) {
        flaggedLetters.delete(currentItem);
    } else {
        flaggedLetters.add(currentItem);
    }
    updateCard();
}

if (flagBtn) {
    flagBtn.addEventListener("click", toggleFlag);
}

/* =========================================
   NAVIGATION CONTROLS
========================================= */

function nextLetter() {
    if (isCompleteCard()) {
        currentIndex = 0;
        updateCard();
        return;
    }

    completeCurrentLetter();

    if (completedLetters.size === letters.length) {
        currentIndex = letters.length;
        updateCard();
        return;
    }

    currentIndex++;
    if (currentIndex >= letters.length) {
        currentIndex = letters.length - 1;
    }

    updateCard();
}

function previousLetter() {
    if (isCompleteCard()) {
        currentIndex = letters.length - 1;
        updateCard();
        return;
    }

    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = letters.length - 1;
    }

    updateCard();
}

function randomLetter() {
    if (completedLetters.size === letters.length || letters.length === 0) return;

    currentIndex = Math.floor(Math.random() * letters.length);
    completeCurrentLetter();

    if (completedLetters.size === letters.length) {
        currentIndex = letters.length;
    }

    updateCard();
}

function shuffleLetters() {
    if (completedLetters.size === letters.length || letters.length === 0) return;

    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    currentIndex = 0;
    updateCard();
}

/* =========================================
   REVIEW FLAGGED MODE
========================================= */

if (reviewFlaggedBtn) {
    reviewFlaggedBtn.addEventListener("click", function () {
        if (!isReviewingFlaggedMode) {
            if (flaggedLetters.size === 0) {
                alert("No cards have been flagged yet!");
                return;
            }
            letters = Array.from(flaggedLetters);
            isReviewingFlaggedMode = true;
        } else {
            letters = [...gurmukhiLetters];
            isReviewingFlaggedMode = false;
        }
        currentIndex = 0;
        completedLetters.clear();
        updateCard();
    });
}

/* =========================================
   EVENT LISTENERS
========================================= */

nextBtn.addEventListener("click", nextLetter);
prevBtn.addEventListener("click", previousLetter);
randomBtn.addEventListener("click", randomLetter);
shuffleBtn.addEventListener("click", shuffleLetters);

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        nextLetter();
    } else if (event.key === "ArrowLeft") {
        previousLetter();
    } else if (event.key === " ") {
        event.preventDefault();
        randomLetter();
    } else if (event.key === "f" || event.key === "F") {
        toggleFlag();
    }
});

resetBtn.addEventListener("click", function () {
    completedLetters.clear();
    flaggedLetters.clear();
    letters = [...gurmukhiLetters];
    isReviewingFlaggedMode = false;
    currentIndex = 0;
    updateCard();
});

/* =========================================
   INITIALIZE
========================================= */

updateCard();
