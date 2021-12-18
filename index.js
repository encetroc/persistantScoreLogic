// grame elments from html
const canvas = document.querySelector(".canvas");
const startBtn = document.querySelector(".startBtn");
const playAgainBtn = document.querySelector(".playAgainBtn");
const scoreList = document.querySelector(".scoreList");
const input = document.querySelector(".input");
const startBtnContainer = document.querySelector(".startBtnContainer");
const scoreListContainer = document.querySelector(".scoreListContainer");

// grab context from canvas and change font
const ctx = canvas.getContext("2d");
ctx.font = "20px monospace";

// gameScreen is start | game | score
let gameScreen = "start";

// game initial value
let name = "";
let timer = 0;
let score = 0;
// initial value of our score is grabed from local storage
const scoreArray = JSON.parse(localStorage.getItem("scores"));

// game loop
setInterval(() => {
  switch (gameScreen) {
    // case we are in the start screen
    case "start":
      startBtnContainer.style.visibility = "visible";
      scoreListContainer.style.visibility = "hidden";
      break;
    // case we are in the game screen
    case "game":
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timer++;
      ctx.fillText(timer, 15, 20);
      // condition for stopping the game and going to score screen
      if (timer > 100) {
        score = randomScore(100, 200);
        scoreArray.push({ name: name, score: score });
        localStorage.setItem("scores", JSON.stringify(scoreArray));
        createListScore(scoreArray);
        gameScreen = "score";
      }
      break;
    //case we are in the score screen
    case "score":
      scoreListContainer.style.visibility = "visible";
      break;
    default:
      break;
  }
}, 20);

// function to reset the initial value of the game
function resetGame() {
  timer = 0;
  score = 0;
  gameScreen = "start";
}

// garab a random score
function randomScore(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// create a list element with the score and name
function createItemScore(score, name) {
  const scoreItem = document.createElement("li");
  scoreItem.innerHTML = `${name} ${score}`;
  scoreList.appendChild(scoreItem);
}

// create multiple list elements from an array
function createListScore(scoreArray) {
  scoreList.innerHTML = "";
  scoreArray.sort((score1, score2) => score2.score - score1.score);
  const top3Scores = [];
  for (let i = 0; i < 3; i++) {
    if (scoreArray[i]) {
      top3Scores.push(scoreArray[i]);
    }
  }
  const top3ScoresTransformed = top3Scores.map((scoreItem) => {
    const first3Letter = `
    ${scoreItem.name.charAt(0)}
    ${scoreItem.name.charAt(1)}
    ${scoreItem.name.charAt(2)}`;

    return {
      score: scoreItem.score,
      name: first3Letter.toLocaleUpperCase(),
    };
  });
  top3ScoresTransformed.forEach((scoreItem) => {
    createItemScore(scoreItem.score, scoreItem.name);
  });
}

// start button click logic
startBtn.onclick = () => {
  if (input.value) {
    name = input.value;
    input.value = "";
    gameScreen = "game";
    startBtnContainer.style.visibility = "hidden";
  }
};

// play again click logic
playAgainBtn.onclick = () => {
  resetGame();
};
