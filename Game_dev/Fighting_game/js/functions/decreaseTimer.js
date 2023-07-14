let timer = 60;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000); // call in 1000 ms interval
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  // determine winner of game
  if (timer === 0) {
    determineWinner({ player1, player2, timerId });
  }
}