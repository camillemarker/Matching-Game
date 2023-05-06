/*----- constants -----*/

/*----- state variables -----*/
let board // 4 columns, 3 rows
let winner
/*----- cached elements  -----*/
/*----- event listeners -----*/

/*----- functions -----*/

init() {
beginBtn.addEventListener('click', init)
playAgainBtn.addEventListener('click', init)
board = [
  [(0, 0, 0)]//colArr 0
  [(0, 0, 0)]//colArr 1
  [(0, 0, 0)]//colArr 2
  [(0, 0, 0)]//colArr 3
]
winner = null
renderTimer
renderControls
}

function cardClick(event) {


}