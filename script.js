/*----- constants -----*/
const cardsArray = [
  { src: 'images/boot.png', alt: 'Boot', cardType: 'boot' },
  { src: 'images/boot.png', alt: 'Boot', cardType: 'boot' },
  { src: 'images/pink-cowgirl-hat.png', alt: 'Hat', cardType: 'hat' },
  { src: 'images/pink-cowgirl-hat.png', alt: 'Hat', cardType: 'hat' },
  { src: 'images/horse.png', alt: 'Horse', cardType: 'horse' },
  { src: 'images/horse.png', alt: 'Horse', cardType: 'horse' },
  { src: 'images/lasso.png', alt: 'Lasso', cardType: 'lasso' },
  { src: 'images/lasso.png', alt: 'Lasso', cardType: 'lasso' },
  { src: 'images/pink-chameleon.png', alt: 'Chameleon', cardType: 'chameleon' },
  { src: 'images/pink-chameleon.png', alt: 'Chameleon', cardType: 'chameleon' },
  { src: 'images/horseshoe.png', alt: 'Horseshoe', cardType: 'horseshoe' },
  { src: 'images/horseshoe.png', alt: 'Horseshoe', cardType: 'horseshoe' }
]

/*----- state variables -----*/
let board //3 rows, 4 columns
let winner
let matches
let clickNum = 1 //number of clicks
let wrong = false
let firstClick
let secondClick

/*----- cached elements  -----*/
// const beginBtn = document.querySelector('#beginBtn')
// const playAgainBtn = document.querySelector('.playAgainBtn')
// const messageEl = document.querySelector('h1')
// const cards = document.querySelectorAll('.card')
// const cardsContainer = document.querySelector('#cards')
// const timer = document.getElementById('#timer')

/*----- event listeners -----*/
//beginBtn.addEventListener('click', init)
//playAgainBtn.addEventListener('click', init)
//cards.addEventListener('click', cardClick)

/*----- functions -----*/
init()

function init() {
  winner = false
  matches = 0
  const playAgainBtn = document.querySelector('.playAgainBtn')
  playAgainBtn.style.visibility = 'hidden'
  randomizeCards(cardsArray)
  render()
}

function render() {
  console.log('rendering')
  renderMessage()
  renderControls()
}

function renderMessage() {
  const messageEl = document.querySelector('h1')
  if (winner) {
    messageEl.innerHTML = 'Yippee-Ki-Yay! You Win'
    const playAgainBtn = document.querySelector('.playAgainBtn')
    playAgainBtn.style.visibility = 'visible'
    playAgainBtn.addEventListener('click', playAgain)
  } else {
    messageEl.innerHTML = "Giddy-Up and Get Matchin'!"
  }
}

function renderControls() {
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.addEventListener('click', cardClick)
  })
}

function playAgain() {
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.classList.toggle('flip')
  })
  init()
}

//Establishing a match
let el1 //first clicked card
let el2 //second clicked card
function cardClick(event) {
  const element = event.target
  console.log(clickNum)
  element.classList.toggle('flip')
  if (clickNum === 1) {
    clickNum = 2
    el1 = element
    el1.removeEventListener('click', cardClick)
    firstClick = element.getAttribute('imgClass')
    console.log(firstClick)
  } else {
    clickNum = 1
    el2 = element
    el2.removeEventListener('click', cardClick)
    secondClick = element.getAttribute('imgClass')
    console.log(firstClick, secondClick)
    if (findMatch() === false) {
      el1.addEventListener('click', cardClick)
      el2.addEventListener('click', cardClick)
    }
  }
}

function findMatch() {
  if (
    firstClick === secondClick &&
    firstClick !== null &&
    secondClick !== null
  ) {
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
      //make cards pause before flipping back over
      el1.classList.toggle('flip'), el2.classList.toggle('flip')
    }, 600)
    return false
  }
}

function declareWinner() {
  console.log('WINNNN')
  winner = true
  renderMessage()
}

function randomizeCards(cards = []) {
  let i = cards.length
  while (--i > 0) {
    let temp = Math.floor(Math.random() * (i + 1))
    ;[cards[temp], cards[i]] = [cards[i], cards[temp]]
  }

  cards.forEach((card) => {
    const divElement = document.createElement('div')
    divElement.className = 'card'
    divElement.setAttribute('imgClass', card.cardType)
    const imgElement = document.createElement('img')
    imgElement.className = 'front'
    imgElement.src = card.src
    imgElement.alt = card.alt

    divElement.appendChild(imgElement)
    document.querySelector('#cards').appendChild(divElement)
  })

  // Create a div -> add 'card' class
  // Create the img element
  // Add src
  // Add alt
  // append img element to div
  // append div to element with id of 'cards'
}
