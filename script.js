/*----- constants -----*/

/*----- state variables -----*/
let board //3 rows, 4 columns
let winner
const cardImgs = [a, b, c, d, e, f] //possible back of card images
const imgPairs = [...cardImgs, ...cardImgs] //combo of any two clicked cards

/*----- cached elements  -----*/
const beginBtn = document.querySelector('#beginBtn')
const playAgainBtn = document.querySelector('#playAgainBtn')
const messageEl = document.querySelector('h1')
const cards = document.querySelectorAll('.card')
const cardsContainer = document.querySelector('#cards')

/*----- event listeners -----*/
beginBtn.addEventListener('click', init)
playAgainBtn.addEventListener('click', init)
card.addEventListener('click', cardClick)

/*----- functions -----*/

function init() {
  board = {
    [0, 0, 0] //colArr 0
    [0, 0, 0] //colArr 1
    [0, 0, 0] //colArr 2
    [0, 0, 0] //colArr 3
  }
  winner = null
  render()
}

function render() {
  renderMessage()
  renderControls()
  playAgainBtn.style.visibilty = 'hidden'
}

function renderMessage() {
  if(winner) {
    messageEl.innerHTML = "Yippee-Ki-Yay! You Win"
    playAgainBtn.style.visibility = 'visible'
  }else if(loser) {
    messageEl.innerHTML = "Better Luck Next Time, Buckaroo! You Lose"
    playAgainBtn.style.visibility = 'visible'
  }else{
    messageEl.innerHTML = ""
  }
}