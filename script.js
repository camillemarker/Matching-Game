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
const timer = document.getElementById('#timer')

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
  matches = 0
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

//timer
// Set the date we're counting down to
const setOneMinuteTime = new Date()
setOneMinuteTime.setTime(Date.now() + 1 * 60 * 1000) // Add 1 minutes to current timestamp
let countDownDate = new Date(setOneMinuteTime).getTime()
//set interval for the actual countdown
let x = setInterval(function () {
  let now = new Date().getTime()
  //end time minus the current time
  let distance = countDownDate - now
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  let seconds = Math.floor((distance % (1000 * 60)) / 1000)
  //show countdown  in div demo
  document.getElementById('timer').innerHTML = minutes + 'm ' + seconds + 's '
  if (distance < 0) {
    clearInterval(x)
    document.getElementById('timer').style.visibility = 'hidden'
    messageEl.innerHTML = 'Slow as Molasses in January! You lose '
    playAgainBtn.style.visibility = 'visible'
  }
}, 1000)

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

/* else if ((timer = expired)) {
    messageEl.innerHTML = 'Slow as Mplasses in January! You lose '
    playAgainBtn.style.visibility = 'visible'
    card.removeEventListener('click', cardClick)*/
