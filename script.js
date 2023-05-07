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
