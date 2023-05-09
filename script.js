/*----- constants -----*/

/*----- state variables -----*/
let board //3 rows, 4 columns
let winner
let matches = 0

/*----- cached elements  -----*/
const beginBtn = document.querySelector('#beginBtn')
const playAgainBtn = document.querySelector('.playAgainBtn')
const messageEl = document.querySelector('h1')
const cards = document.querySelectorAll('.card')
const cardsContainer = document.querySelector('#cards')

/*----- event listeners -----*/
//beginBtn.addEventListener('click', init)
playAgainBtn.addEventListener('click', init)
//card.addEventListener('click', cardClick)

/*----- functions -----*/
init()

function init() {
  board = [
    [0, 0, 0], //colArr 0
    [0, 0, 0], //colArr 1
    [0, 0, 0], //colArr 2
    [0, 0, 0] //colArr 3
  ]
  winner = false
  //setTimer()
  //randomizeCards()
  render()
}

function render() {
  console.log('rendering')
  playAgainBtn.style.visibility = 'hidden'
  renderMessage()
  renderControls()
}

function renderMessage() {
  if (winner) {
    messageEl.innerHTML = 'Yippee-Ki-Yay! You Win'
    playAgainBtn.style.visibility = 'visible'
  } else {
    messageEl.innerHTML = "Giddy-Up and Get Matchin'!"
  }
}

function renderControls() {
  cards.forEach((card) => {
    card.addEventListener('click', cardClick)
  })
}

//Establishing a match
const cardClassName = ['boot', 'hat', 'pistol', 'horse', 'horseshoe', 'lasso']
let clickNum = 1 //number of clicks
let wrong = false
let firstClick
let secondClick

function cardClick(event) {
  const element = event.target
  console.log(clickNum)
  element.classList.toggle('flip')
  if (clickNum === 1) {
    clickNum = 2
    firstClick = element
    console.log(firstClick.getAttribute('imgClass'))
  } else {
    clickNum = 1
    secondClick = element
    console.log(
      firstClick.getAttribute('imgClass'),
      secondClick.getAttribute('imgClass')
    )
    if (findMatch() === true) {
      firstClick.removeEventListener('click', cardClick)
      secondClick.removeEventListener('click', cardClick)
    }
  }
}

function findMatch() {
  if (
    firstClick.getAttribute('imgClass') === secondClick.getAttribute('imgClass')
  ) {
    console.log('its a match!')
    matches++
    console.log('matches; ', matches)
    if (matches >= 6) {
      declareWinner()
    }
    return true
  } else {
    firstClick = ''
    secondClick = ''
  }
}

function declareWinner() {
  console.log('WINNNN')
  winner = true
  renderMessage()
}
