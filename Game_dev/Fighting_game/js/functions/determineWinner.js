function determineWinner({ player1, player2, timerId }) {
    clearTimeout(timerId);
    document.querySelector("#displayText").style.display = "flex";
    if (player1.health === player2.health) {
      document.querySelector("#displayText").innerHTML = "Draw";
    } else if (player1.health > player2.health) {
      document.querySelector("#displayText").innerHTML = "Player 1 wins";
    } else if (player1.health < player2.health) {
      document.querySelector("#displayText").innerHTML = "Player 2 wins";
    }
  }