/* =========================================
   GURMUKHI ALPHABET
========================================= */

/*
   41 Gurmukhi/Punjabi letters.

   The first 35 are the traditional
   Gurmukhi akhar.

   The final 6 are commonly taught
   additional Punjabi letters.
*/

const gurmukhiLetters = [

    "Way",
    "These",
    "Them",

    "Our",
    "His",

    "All",
    "With",
    "Little",
    "We",
    "White",

    "Place",
    "Then",
    "New",
    "Saw",
    "One",

    "Her",
    "Two",
    "Jump",
    "Down",
    "Out",

    "Come",
    "Do",
    "Good",
    "Blue",
    "Day",

    "Four",
    "Has",
    "Eat",
    "Water",
    "From",

    "Brown",
    "Which",
    "Yellow",
    "By",
    "This",

    "What",
    "Some",
    "Here",
    "Pretty",
    "Will",
  "Many",
  "Can",
  "Go",
  "You",
	"Like",
	"To",
	"My",
	"And",
	"About",
  "Are",
	"Please",
  "May",
	"Or",
  "Does",
  "Who",
 "That",
	"Away",
  "How",
	"Each",
  "Where",
	"Is",
  "Play",
  "Too",
	"Help",
  "Me",
  "Want",
  "Said",
  "Have",
  "They",
  "Of",
	"For",
  "Was",
	"She",
  "A",
	"The",
  "See",
	"Could",
  "I",
  "Look",
	"He"
	"Under",
	"Long",
	"Say",
	"Now",
	"Than",
	"When",
];



/* =========================================
   TOTALS
========================================= */

const TOTAL_LETTERS =
    gurmukhiLetters.length;

const TOTAL_CARDS =
    TOTAL_LETTERS + 1;



/* =========================================
   CURRENT LETTER ORDER
========================================= */

let letters =
    [...gurmukhiLetters];

let currentIndex = 0;



/* =========================================
   COMPLETED LETTERS
========================================= */

let completedLetters =
    new Set();



/* =========================================
   COMPLETE CARD
========================================= */

const COMPLETE_CARD =
    "🎉 完成!";


/*
   Use Punjabi text instead of Chinese
   for the completion screen.
*/

const COMPLETE_MESSAGE =
    "🎉 Complete";



/* =========================================
   HTML ELEMENTS
========================================= */

const card =
    document.getElementById("card");

const cardNumber =
    document.getElementById("cardNumber");

const counter =
    document.getElementById("counter");

const progressBar =
    document.getElementById("progressBar");

const nextBtn =
    document.getElementById("nextBtn");

const prevBtn =
    document.getElementById("prevBtn");

const randomBtn =
    document.getElementById("randomBtn");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const resetBtn =
    document.getElementById("resetBtn");



/* =========================================
   IS COMPLETE CARD
========================================= */

function isCompleteCard() {

    return currentIndex >= letters.length;

}



/* =========================================
   COMPLETE CURRENT LETTER
========================================= */

function completeCurrentLetter() {


    /*
       Don't count the Complete card.
    */

    if (isCompleteCard()) {

        return;

    }


    /*
       Add the current letter.

       Set prevents duplicates.
    */

    const letter =
        letters[currentIndex];

    completedLetters.add(letter);

}



/* =========================================
   UPDATE CARD NUMBER
========================================= */

function updateCardNumber() {


    /*
       Complete = final card.
    */

    if (isCompleteCard()) {

        cardNumber.textContent =
            `Card ${TOTAL_CARDS} of ${TOTAL_CARDS}`;

        return;

    }


    /*
       Normal card.
    */

    cardNumber.textContent =
        `Card ${currentIndex + 1} of ${TOTAL_CARDS}`;

}



/* =========================================
   UPDATE COUNTER
========================================= */

function updateCounter() {


    const completed =
        completedLetters.size;


    const remaining =
        TOTAL_LETTERS - completed;


    /*
       Complete.
    */

    if (
        completed === TOTAL_LETTERS
    ) {

        counter.textContent =
            `🎉 All ${TOTAL_LETTERS} letters completed!`;

        counter.style.color =
            "#16a34a";

    }


    /*
       Normal.
    */

    else {

        counter.textContent =
            `${completed} of ${TOTAL_LETTERS} letters completed • ${remaining} remaining`;

        counter.style.color =
            "#4b5563";

    }


    /*
       Progress bar.
    */

    const percentage =
        (completed / TOTAL_LETTERS) * 100;


    progressBar.style.width =
        `${percentage}%`;

}



/* =========================================
   UPDATE CARD
========================================= */

function updateCard() {


    /*
       Fade out.
    */

    card.style.opacity =
        "0";

    card.style.transform =
        "scale(0.85)";


    setTimeout(() => {


        /* =================================
           COMPLETE CARD
        ================================= */

        if (isCompleteCard()) {

            card.textContent =
                COMPLETE_MESSAGE;

            card.style.background =
                "#22c55e";

            card.style.color =
                "white";

            card.style.fontSize =
                "70px";

        }


        /* =================================
           NORMAL LETTER
        ================================= */

        else {

            card.textContent =
                letters[currentIndex];

            card.style.background =
                "white";

            card.style.color =
                "#111827";

           

        }


        /*
           Fade in.
        */

        card.style.opacity =
            "1";

        card.style.transform =
            "scale(1)";


        /*
           Update information.
        */

        updateCardNumber();

        updateCounter();


    }, 120);

}



/* =========================================
   NEXT
========================================= */

function nextLetter() {


    /*
       If Complete is showing,
       start over.
    */

    if (isCompleteCard()) {

        currentIndex = 0;

        updateCard();

        return;

    }


    /*
       Complete current letter.
    */

    completeCurrentLetter();


    /*
       Check whether all letters
       are now completed.
    */

    if (
        completedLetters.size ===
        TOTAL_LETTERS
    ) {

        /*
           Move to Complete card.
        */

        currentIndex =
            letters.length;

        updateCard();

        return;

    }


    /*
       Move to next letter.
    */

    currentIndex++;


    /*
       Safety check.
    */

    if (
        currentIndex >=
        letters.length
    ) {

        currentIndex =
            letters.length - 1;

    }


    updateCard();

}



/* =========================================
   PREVIOUS
========================================= */

function previousLetter() {


    /*
       If Complete is showing,
       go back to final letter.
    */

    if (isCompleteCard()) {

        currentIndex =
            letters.length - 1;

        updateCard();

        return;

    }


    /*
       Move backward.
    */

    currentIndex--;


    /*
       Loop back to last letter.
    */

    if (currentIndex < 0) {

        currentIndex =
            letters.length - 1;

    }


    updateCard();

}



/* =========================================
   RANDOM
========================================= */

function randomLetter() {


    /*
       Don't do anything after
       all letters are complete.
    */

    if (
        completedLetters.size ===
        TOTAL_LETTERS
    ) {

        return;

    }


    /*
       Select random letter.
    */

    currentIndex =
        Math.floor(
            Math.random() *
            letters.length
        );


    /*
       Mark it completed.
    */

    completeCurrentLetter();


    /*
       If this was the last
       uncompleted letter,
       show Complete.
    */

    if (
        completedLetters.size ===
        TOTAL_LETTERS
    ) {

        currentIndex =
            letters.length;

    }


    updateCard();

}



/* =========================================
   SHUFFLE
========================================= */

function shuffleLetters() {


    /*
       Don't shuffle after completion.
    */

    if (
        completedLetters.size ===
        TOTAL_LETTERS
    ) {

        return;

    }


    /*
       Fisher-Yates shuffle.
    */

    for (
        let i =
            letters.length - 1;

        i > 0;

        i--
    ) {


        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            letters[i],
            letters[j]
        ] =
        [
            letters[j],
            letters[i]
        ];

    }


    /*
       Start at first shuffled card.
    */

    currentIndex = 0;


    updateCard();

}



/* =========================================
   BUTTON EVENTS
========================================= */

nextBtn.addEventListener(
    "click",
    nextLetter
);


prevBtn.addEventListener(
    "click",
    previousLetter
);


randomBtn.addEventListener(
    "click",
    randomLetter
);


shuffleBtn.addEventListener(
    "click",
    shuffleLetters
);



/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    function(event) {


        /*
           Right arrow.
        */

        if (
            event.key ===
            "ArrowRight"
        ) {

            nextLetter();

        }


        /*
           Left arrow.
        */

        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousLetter();

        }


        /*
           Space = Random.
        */

        if (
            event.key ===
            " "
        ) {

            event.preventDefault();

            randomLetter();

        }

    }
);



/* =========================================
   START OVER
========================================= */

resetBtn.addEventListener(
    "click",
    function() {


        /*
           Clear completed letters.
        */

        completedLetters.clear();


        /*
           Restore original order.
        */

        letters =
            [...gurmukhiLetters];


        /*
           Return to first card.
        */

        currentIndex = 0;


        /*
           Update everything.
        */

        updateCard();

    }
);



/* =========================================
   INITIALIZE
========================================= */

updateCard();
