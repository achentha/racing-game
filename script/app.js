let step = 50;  //distance for each step forward in pixel

let game = {
  playerWidth: 0,
  gameWidth: 0,
  aOffsetLeft: 0,  //distance on the left to parent div(game) in pixel
  bOffsetLeft: 0,
  winner: "none",

  setWidth: function(gameWidth, playerWidth) { //needs to be called before restart() below.
    this.gameWidth = gameWidth;
    this.playerWidth = playerWidth;
  },

  resetPlayers: function() {
    //reset everything to the begining of the game state, e.g, no winner yet
    this.winner = "none";
    this.aOffsetLeft = 0;
    this.bOffsetLeft = 0;
  },

  moveA: function() {
    this.aOffsetLeft += step;
    if ((this.aOffsetLeft + this.playerWidth >= this.gameWidth) &&
        (this.winner === "none")) {
      this.winner = "A";
      return this.winner;
    }

    return "none";  //no winner yet
  },

  moveB: function() {
    this.bOffsetLeft += step;
    if ((this.bOffsetLeft + this.playerWidth >= this.gameWidth) &&
        (this.winner === "none")) {
      this.winner = "B";
      return this.winner;
    }

    return "none";  //no winner yet
  },
}





$(document).ready(function() {
  let winner;

  function restart() {
    winner = "none";

    game.setWidth($(".game").innerWidth(),
                  $(".A").outerWidth());
    game.resetPlayers();
  }

  restart();
  $(".restartButton").on("click", restart);

  $(window).keyup(function(kbEvent) {  //capture the key and update db & DOM
    if(kbEvent.keyCode === 90) {
      if ((winner = game.moveA()) === "A") {
        let winnerOffset = $(".game").innerWidth() + $(".A").outerWidth();
        $(".A").animate({left: `${winnerOffset}`});
      }
      else {
        $(".A").animate({left: `+=${step}px`});
      }
    }
    else if (kbEvent.keyCode === 39) {
      if ((winner = game.moveB()) === "B") {
        let winnerOffset = $(".game").innerWidth() + $(".B").outerWidth();
        $(".B").animate({left: `${winnerOffset}`});
      }
      else {
        $(".B").animate({left: `+=${step}px`});
      }
    }
    else {
      console.log("ignore other key press");
    }

    if (winner !== "none") {
      $(".space").html(`<h1>Player ${winner} won!!!</h1>`);
    }
  });

})
