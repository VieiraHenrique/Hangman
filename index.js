// DEFINE VARIABLES

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const popupContainer = document.getElementById('popup-container');
const popupContent = document.getElementById('popup-content');
const word = document.getElementById('word');


// DEFINE CANVAS PROPERTIES

canvas.width = 600;
canvas.height = 360;

// FUNCTIONS TO DRAW PATHS

function drawHang(){
    c.beginPath();
    c.moveTo(50, 320);
    c.lineTo(50,100);
    c.lineTo(60, 100);
    c.fill()
    c.moveTo(60,100);
    c.lineTo(130,100);
    c.lineTo(130, 110)
    c.fill();
    c.moveTo(130,100);
    c.lineTo(135,100);
    c.lineTo(135,150);
    c.lineTo(130, 150)
    c.fill()
}

function drawHead(){
    c.beginPath();
    c.arc(132.5, 157.5, 15, 0, Math.PI * 2, true)
    c.fill()
}

function drawBody(){
    c.beginPath();
    c.moveTo(132.5, 170);
    c.lineTo(138, 180);
    c.lineTo(132.5, 180);
    c.fill();
    c.moveTo(125,180);
    c.lineTo(145,180);
    c.lineTo(130,230);
    c.lineTo(125, 230);
    c.fill();
}

function drawLArm(){
    c.beginPath();
    c.moveTo(125,180)
    c.lineTo(80,160)
    c.lineTo(125, 185)
    c.fill()
}

function drawRArm(){
    c.beginPath();
    c.moveTo(145, 180);
    c.lineTo(170, 160);
    c.lineTo(145, 185);
    c.fill()
}

function drawLLeg(){
    c.beginPath();
    c.moveTo(125,230);
    c.lineTo(130,230);
    c.lineTo(115,280 );
    c.fill()
}

function drawRLeg(){
    c.beginPath();
    c.moveTo(125,230);
    c.lineTo(130, 230);
    c.lineTo(150, 280);
    c.fill();
}

// CREATE ARRAY WITH FUNCTIONS TO DRAW CHARACTER

const funcs = [drawHead,drawBody,drawLArm,drawRArm,drawLLeg,drawRLeg]

// CREATE ARRAY WITH POSSIBLE WORDS
const possibleWords = ['hello', 'goodbye'];

// DEFINE SELECTED WORD FROM POSSIBLE WORDS
let selectedWord = possibleWords[Math.floor(Math.random()*possibleWords.length)];

// DEFINE ARRAYS FOR CORRECT LETTERS AND WRONG LETTERS
let correctLetters = [];
let wrongLetters = [];

// MAIN GAME

function displayWord(){
    word.innerHTML = `
    ${selectedWord.split('').map((letter)=>{
        return `<span class="letter"> ${correctLetters.includes(letter)? letter:' '} </span>`
    }).join('')}
`
    const innerWord = word.innerText;
    if (innerWord === selectedWord) {
        showPopupWin();
    }
}

function displayWrong(){
    for (let i = 0 ; i < wrongLetters.length ; i++){
        funcs[i]();
        if (wrongLetters.length === funcs.length) {
            showPopupLost()
        }
    }
}


drawHang();
displayWord();


//
function showPopupLost(){
    popupContainer.style.display = 'flex'
    popupContent.querySelector('h2').innerText = 'You lost !';
    popupContent.querySelector('p').innerText = `The word was "${selectedWord}"`;
    popupContent.querySelector('h3').addEventListener('click',()=>{
        correctLetters = [];
        wrongLetters = [];
        selectedWord = possibleWords[Math.floor(Math.random()*possibleWords.length)];
        popupContainer.style.display = 'none';
        drawHang();
        displayWord();
        c.clearRect(0,0,canvas.width,canvas.height);
        drawHang();
    })
}
function showPopupWin(){
    popupContainer.style.display = 'flex'
    popupContent.querySelector('h2').innerText = 'You win !';
    popupContent.querySelector('p').innerText = `Congratulations !`;
    popupContent.querySelector('h3').addEventListener('click',()=>{
        correctLetters = [];
        wrongLetters = [];
        selectedWord = possibleWords[Math.floor(Math.random()*possibleWords.length)];
        popupContainer.style.display = 'none';
        drawHang();
        displayWord();
        c.clearRect(0,0,canvas.width,canvas.height);
        drawHang();
    })
}

// EVENT LISTENER FOR KEYDOWN

window.addEventListener('keydown',(e)=>{
    if (e.keyCode >= 65 && e.keyCode<= 90) {
        if(selectedWord.includes(e.key)) {
            correctLetters.push(e.key);
        } else {
            wrongLetters.push(e.key);

        }
    }

    displayWord();
    displayWrong()
})

