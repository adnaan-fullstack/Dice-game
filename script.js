const totalScoreEl0 = document.getElementById('total-score--0');
const totalScoreEl1 = document.getElementById('total-score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnReset = document.querySelector('.btn--reset');
const player0El = document.querySelector('.Player--0');
const player1El = document.querySelector('.Player--1');
const currentScoreEl0 = document.getElementById('current-score--0');
const currentScoreEl1 = document.getElementById('current-score--1');

let scores, activePlayer, currentScore, playing;
const init = () => {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  diceEl.classList.add('hidden');
  totalScoreEl0.textContent = 0;
  totalScoreEl1.textContent = 0;
  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

};

init()

const switchPlayer = () => {
  document.getElementById(`current-score--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-score--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// when a player holds the score..........

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`total-score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.Player--${activePlayer}`)
        .classList.add('player--winner');

      playing = false;
    } else {
      switchPlayer();
    }
  }
});

// when a player resets the game .............

btnReset.addEventListener('click', init);