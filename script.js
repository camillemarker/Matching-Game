/*----- constants -----*/

/*----- state variables -----*/
let board //3 rows, 4 columns
let winner
let matches
let clickNum = 1 //number of clicks
let wrong = false
let firstClick
let secondClick

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
//cards.addEventListener('click', cardClick)

/*----- functions -----*/
init()

function init() {
  winner = false
  matches = 0
  playAgainBtn.style.visibility = 'hidden'
  //randomizeCards()
  render()
}

function render() {
  console.log('rendering')
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
/*const setOneMinuteTime = new Date()
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
    messageEl.innerHTML = 'Slow as Molasses in January! You lose '
    timer.remove()
    playAgainBtn.style.visibility = 'visible'
    console.log('TIMERRR')
  }
}, 1000) */

//Establishing a match
let el1
let el2
function cardClick(event) {
  const element = event.target
  console.log(clickNum)
  element.classList.toggle('flip')
  if (clickNum === 1) {
    clickNum = 2
    el1 = element
    firstClick = element.getAttribute('imgClass')
    console.log(firstClick)
  } else {
    clickNum = 1
    el2 = element
    secondClick = element.getAttribute('imgClass')
    console.log(firstClick, secondClick)
    if (findMatch() === true) {
      el1.removeEventListener('click', cardClick)
      el2.removeEventListener('click', cardClick)
    }
  }
}

function findMatch() {
  if (firstClick === secondClick) {
    console.log('its a match!')
    matches++
    console.log('matches; ', matches)
    if (matches >= 6) {
      declareWinner()
    }
    firstClick = ''
    secondClick = ''
    return true
  } else {
    firstClick = ''
    secondClick = ''
    setTimeout(() => {
      el1.classList.toggle('flip'), el2.classList.toggle('flip') //make cards pause before flipping back over
    }, 1200)
    return false
  }
}

function declareWinner() {
  console.log('WINNNN')
  winner = true
  renderMessage()
}
