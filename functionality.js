"use strict";

//save the different elements of the page for an easier manipulation
let betAmount = document.querySelector("#USDamount");
const betMinusBtn = document.querySelector(".BetMinusBtn");
const betPlusBtn = document.querySelector(".BetPlusBtn");
const oneUSDBTN = document.querySelector("#oneUSD");
const threeUSDBTN = document.querySelector("#threeUSD");
const fiveUSDBTN = document.querySelector("#fiveUSD");
const tenUSDBTN = document.querySelector("#tenUSD");
let minesAmount = document.querySelector("#MinesAmount");
const minesMinusBtn = document.querySelector(".MineMinusBtn");
const minesPlusBtn = document.querySelector(".MinePlusBtn");
const oneMine = document.querySelector("#oneMine");
const threeMines = document.querySelector("#threeMines");
const fourMines = document.querySelector("#fourMines");
const sevenMines = document.querySelector("#sevenMines");
const nineMines = document.querySelector("#nineMines");
const fifteenMines = document.querySelector("#fifteenMines");
const BetButton = document.querySelector(".Bet-Cashout-button");
const box = document.querySelectorAll(".box");
let myMoney = document.querySelector("#MyMoney");
let starsOpenedText = document.querySelector("#StarsOpened");
let nextTileText = document.querySelector("#NextTile");
const nextTileContainer = document.querySelector(".NextTile");
const starsStatsContainer = document.querySelector("#starsStats");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal");
const modalOverlay = document.querySelector(".overlay");
const howToPlayButton = document.querySelector(".HowToPlay-button");

//add the sounds
const cashoutSnd = new Audio("sounds/cashout.mp3");
const click = new Audio("sounds/click.mp3");
const fail = new Audio("sounds/fail.mp3");

//initializations
betAmount.value = 0.1;
betAmount.value = Number(betAmount.value).toFixed(2);
minesAmount.value = 3;
let bombPositions = [];
myMoney.textContent = `3000$`;
let openedStars = 0;
let totalStars = 0;
let cashout = betAmount.value;
//addition to the cashout money
let addition = 0;
let gameover = false;

//functions
const openModal = function () {
  modal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
};

const setBetAmount = function (val) {
  betAmount.value = val;
  betAmount.value = Number(betAmount.value).toFixed(2);
};

const setMinesAmount = function (val) {
  minesAmount.value = val;
};

const validateBetAmountValue = function () {
  //remove the dollar sign at the end so we can process the number
  let myCash = myMoney.textContent.substring(0, myMoney.textContent.length - 1);
  if (Number(betAmount.value) > Number(myCash) && Number(myCash) > 0.1) {
    betAmount.value = Number(myCash);
    betAmount.value = Number(betAmount.value).toFixed(2);
  } else if (Number(myCash) < 0.1) {
    BetButton.disabled = true;
    //*PLUS DISCUSSION NEEDS TO BE DONE TO SEE HOW TO TERMINATE THE GAME* (maybe disable everything
    //and give an alert about game over)
  }

  if (Number(betAmount.value) > 100) {
    betAmount.value = 100;
    betAmount.value = Number(betAmount.value).toFixed(2);
  } else if (Number(betAmount.value) < 0.1) {
    betAmount.value = 0.1;
    betAmount.value = Number(betAmount.value).toFixed(2);
  }
};

const validateMinesAmountValue = function () {
  if (Number(minesAmount.value) > 20) minesAmount.value = 20;
  else if (Number(minesAmount.value) < 1) minesAmount.value = 1;
};

const resetEverything = function () {
  //reset because a player clicked on a bomb
  if (gameover === true) {
    gameover = false;
  } //reset because the player clicked on "cashout" or opened all the stars
  else {
    cashoutSnd.play();
    for (let i = 0; i < box.length; i++) {
      if (bombPositions.includes(i + 1)) {
        box[i].src = "image/bomb.png";
        box[i].disabled = true;
      } else if (box[i].disabled !== true) {
        box[i].src = "image/star2.png";
        box[i].disabled = true;
      }
    }
    //remove the dollar sign at the end so we can process the number
    myMoney.textContent = myMoney.textContent.substring(
      0,
      myMoney.textContent.length - 1
    );
    myMoney.textContent = `${(Number(myMoney.textContent) + cashout).toFixed(
      2
    )}$`;
  }

  BetButton.textContent = `BET`;
  bombPositions = [];
  openedStars = 0;
  totalStars = 0;

  //enable everything in the game cofiguration section
  betAmount.disabled = false;
  betMinusBtn.disabled = false;
  betPlusBtn.disabled = false;
  oneUSDBTN.disabled = false;
  threeUSDBTN.disabled = false;
  fiveUSDBTN.disabled = false;
  tenUSDBTN.disabled = false;
  minesAmount.disabled = false;
  minesMinusBtn.disabled = false;
  minesPlusBtn.disabled = false;
  oneMine.disabled = false;
  threeMines.disabled = false;
  fourMines.disabled = false;
  sevenMines.disabled = false;
  nineMines.disabled = false;
  fifteenMines.disabled = false;
  BetButton.disabled = false;
};

//modal listener
howToPlayButton.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

//Add listeners to all the table boxes
for (let i = 0; i < box.length; i++) {
  box[i].addEventListener("click", function () {
    //if the user clicked on a bomb

    if (bombPositions.includes(i + 1)) {
      fail.play();
      gameover = true;
      this.src = "image/explosion.png";
      box[i].disabled = true;
      for (let j = 0; j < box.length; j++) {
        if (bombPositions.includes(j + 1) && j !== i) {
          box[j].src = "image/bomb.png";
          box[j].disabled = true;
        } else if (!bombPositions.includes(j + 1) && box[j].disabled !== true) {
          box[j].src = "image/star2.png";
          box[j].disabled = true;
        }
      }
      resetEverything();
    } //if the user clicked on a star
    else {
      //every time define a new one since if the player plays too fast we need different player for each
      //success sound otherwise some of them will be overwritten and lost
      const success = new Audio("sounds/success.mp3");
      success.play();
      this.src = "image/star.png";
      this.disabled = true;
      BetButton.disabled = false;

      //update the stats
      openedStars++;
      starsOpenedText.textContent = `${openedStars}/${totalStars}`;

      //update the cashout button text
      BetButton.textContent = `CASHOUT ${nextTileText.textContent}`;
      cashout = Number(
        nextTileText.textContent.substring(
          0,
          nextTileText.textContent.length - 1
        )
      );
      //check if the user opened all the stars.
      if (openedStars === totalStars) {
        resetEverything;
      }
      //update the next tile text
      //remove the dollar in the end to manipulate the number
      if (openedStars % 5 === 0) {
        addition = betAmount.value / 10;
      }
      if (openedStars === 1) {
        nextTileText.textContent = `${(
          (Number(minesAmount.value) / (totalStars - openedStars)) *
            betAmount.value +
          Number(cashout) +
          addition
        ).toFixed(2)}$`;
      } else {
        nextTileText.textContent = `${(
          (Number(minesAmount.value) / (totalStars - openedStars)) * cashout +
          cashout +
          addition
        ).toFixed(2)}$`;
      }
    }
  });
  box[i].disabled = true;
}

//Bet amount decrease button listener
betMinusBtn.addEventListener("click", function () {
  betAmount.value = Number(betAmount.value) - 0.1;
  betAmount.value = Number(betAmount.value).toFixed(2);
  validateBetAmountValue();
});

//Bet amount increase button listener
betPlusBtn.addEventListener("click", function () {
  betAmount.value = Number(betAmount.value) + 0.1;
  betAmount.value = Number(betAmount.value).toFixed(2);
  validateBetAmountValue();
});

//fixed bet amount buttons listeners
oneUSDBTN.addEventListener("click", function () {
  setBetAmount(1);
  validateBetAmountValue();
});

threeUSDBTN.addEventListener("click", function () {
  setBetAmount(3);
  validateBetAmountValue();
});

fiveUSDBTN.addEventListener("click", function () {
  setBetAmount(5);
  validateBetAmountValue();
});

tenUSDBTN.addEventListener("click", function () {
  setBetAmount(10);
  validateBetAmountValue();
});

//Mine amount decrease button listener
minesMinusBtn.addEventListener("click", function () {
  minesAmount.value = Number(minesAmount.value) - 1;
  validateMinesAmountValue();
});

//Mine amount increase button listener
minesPlusBtn.addEventListener("click", function () {
  minesAmount.value = Number(minesAmount.value) + 1;
  minesAmount.value = Number(minesAmount.value).toFixed(0);
  validateMinesAmountValue();
});

//fixed mine amount buttons' listeners
oneMine.addEventListener("click", function () {
  setMinesAmount(1);
});

threeMines.addEventListener("click", function () {
  setMinesAmount(3);
});

fourMines.addEventListener("click", function () {
  setMinesAmount(4);
});

sevenMines.addEventListener("click", function () {
  setMinesAmount(7);
});

nineMines.addEventListener("click", function () {
  setMinesAmount(9);
});

fifteenMines.addEventListener("click", function () {
  setMinesAmount(15);
});

//Bet button listener
BetButton.addEventListener("click", function () {
  //thigs to be done at the first move (when the opened stars are 0 and the button is "BET")
  if (openedStars === 0) {
    //make sure that the bet amount value and the mines amoun value are valid
    click.play();
    validateBetAmountValue();
    validateMinesAmountValue();
    //set the boxes to defaul backgrounds
    for (let i = 0; i < box.length; i++) {
      box[i].src = "image/default.png";
    }
    cashout = Number(betAmount.value);
    //remove the dollar sign at the end so we can process the number
    myMoney.textContent = myMoney.textContent.substring(
      0,
      myMoney.textContent.length - 1
    );

    myMoney.textContent = `${(
      Number(myMoney.textContent) - Number(betAmount.value)
    ).toFixed(2)}$`;

    totalStars = 25 - Number(minesAmount.value);
    starsOpenedText.textContent = `${openedStars}/${totalStars}`;

    nextTileText.textContent = `${(
      Number(betAmount.value) / 10 +
      Math.round(Number(betAmount.value) / 5) * 0.01 +
      Number(betAmount.value)
    ).toFixed(2)}$`;

    nextTileContainer.classList.remove("hidden");
    starsStatsContainer.classList.remove("hidden");

    //disable everything in the game cofiguration section
    betAmount.disabled = true;
    betMinusBtn.disabled = true;
    betPlusBtn.disabled = true;
    oneUSDBTN.disabled = true;
    threeUSDBTN.disabled = true;
    fiveUSDBTN.disabled = true;
    tenUSDBTN.disabled = true;
    minesAmount.disabled = true;
    minesMinusBtn.disabled = true;
    minesPlusBtn.disabled = true;
    oneMine.disabled = true;
    threeMines.disabled = true;
    fourMines.disabled = true;
    sevenMines.disabled = true;
    nineMines.disabled = true;
    fifteenMines.disabled = true;
    BetButton.disabled = true;

    //change the bet button text to cashout but it's still disabled till the first move
    BetButton.textContent = `CASHOUT ${cashout}$`;

    //enable boxes
    for (let i = 0; i < box.length; i++) {
      box[i].disabled = false;
    }

    //generate the random numbers between [1,25] for the bomb positions
    let r = Math.trunc(Math.random() * 25) + 1;
    bombPositions.push(r);
    for (let i = 1; i < Number(minesAmount.value); i++) {
      r = Math.trunc(Math.random() * 25) + 1;
      while (bombPositions.includes(r)) {
        r = Math.trunc(Math.random() * 25) + 1;
      }
      bombPositions.push(r);
    }
  } //things to be done when the player wants to cashout
  else {
    resetEverything();
  }
});
