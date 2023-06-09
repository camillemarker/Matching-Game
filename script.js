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
let seconds
let firstClick
let secondClick
let el1 //first clicked card
let el2 //second clicked card
let timer

/*----- cached elements  -----*/

const playAgainBtn = document.querySelector('.playAgainBtn')
const messageEl = document.querySelector('h1')

/*----- functions -----*/

const render = () => {
  renderMessage()
  renderControls()
}

const init = () => {
  winner = false
  timerExpired = false
  matches = 0
  seconds = 40
  timer = setInterval(countDown, 1000)
  playAgainBtn.style.visibility = 'hidden'
  randomizeCards(cardsArray)
  render()
}

const renderMessage = () => {
  const cards = document.querySelectorAll('.card')
  playAgainBtn.addEventListener('click', playAgain)
  if (winner) {
    messageEl.innerHTML = 'Yippee-Ki-Yay! You Win'
    playAgainBtn.style.visibility = 'visible'
  } else if (timerExpired) {
    messageEl.innerHTML = 'Slower than Molasses in January! You Lose!'
    playAgainBtn.style.visibility = 'visible'
    cards.forEach((card) => {
      card.removeEventListener('click', cardClick)
    })
  } else {
    messageEl.innerHTML = "Giddy-Up and Get Matchin'!"
  }
}

const renderControls = () => {
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.addEventListener('click', cardClick)
  })
}

const playAgain = () => {
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.remove() //gets rid of the last array of cards
  })
  init()
}

const findMatch = () => {
  if (firstClick === secondClick) {
    matches++
    if ((matches = 6)) {
      declareWinner()
    }
  } else {
    setTimeout(() => {
      //make cards pause before flipping back over
      el1.classList.toggle('flip'), el2.classList.toggle('flip')
    }, 600)
    el1.addEventListener('click', cardClick)
    el2.addEventListener('click', cardClick)
  }
  firstClick = ''
  secondClick = ''
}

const cardClick = (event) => {
  const element = event.target
  element.classList.toggle('flip')
  if (clickNum === 1) {
    clickNum = 2
    el1 = element
    el1.removeEventListener('click', cardClick)
    firstClick = element.getAttribute('imgClass')
  } else {
    clickNum = 1
    el2 = element
    el2.removeEventListener('click', cardClick)
    secondClick = element.getAttribute('imgClass')
    findMatch()
  }
}

const declareWinner = () => {
  winner = true
  clearInterval(timer)
  renderMessage()
}

const randomizeCards = (cards = []) => {
  //Fisher Yates (see sources)
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
}

const countDown = () => {
  seconds--
  if (seconds === 0) {
    clearInterval(timer)
    timerExpired = true
    renderMessage()
  }
  document.getElementById('timer').textContent = seconds + ' seconds'
}

init()
