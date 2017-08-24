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
    if (this.winner === "none") {
      this.aOffsetLeft += step;
      if (this.aOffsetLeft + this.playerWidth >= this.gameWidth) {
        this.winner = "A";
      }
      return this.winner;
    }
    else {
      return "gameover";
    }
  },

  moveB: function() {
    if (this.winner === "none") {
      this.bOffsetLeft += step;
      if (this.bOffsetLeft + this.playerWidth >= this.gameWidth) {
        this.winner = "B";
      }
      return this.winner;
    }
    else {
      return "gameover";
    }
  }
}





$(document).ready(function() {
  let winner;

  function restart() {
    winner = "none";

    game.setWidth($(".game").innerWidth(),
                  $(".A").outerWidth());
    game.resetPlayers();
    $(".A").animate({left: 0});
    $(".B").animate({left: 0});
    $(".result").html("");

  }

  restart();
  $(".restartButton").on("click", function() {
    restart();
  });

  $(window).keyup(function(kbEvent) {  //capture the key and update db & DOM
    if(kbEvent.keyCode === 90) {
      if ((winner = game.moveA()) === "A") {
        let winnerOffset = $(".game").innerWidth() - $(".A").outerWidth() - 10;
        $(".A").animate({left: `${winnerOffset}`});
      }
      else if (winner === "none") {
        $(".A").animate({left: `+=${step}px`});
      }
    }
    else if (kbEvent.keyCode === 39) {
      if ((winner = game.moveB()) === "B") {
        let winnerOffset = $(".game").innerWidth() - $(".B").outerWidth() - 10;
        $(".B").animate({left: `${winnerOffset}`});
      }
      else if (winner === "none") {
        $(".B").animate({left: `+=${step}px`});
      }
    }
    else {
      console.log("ignore other key press");
    }

    if (winner === "A") {
      $(".result").html(`<h1 style="z-index: 9">!!! The Lion has won !!!</h1>`);
    }
    else if (winner === "B") {
      $(".result").html(`<h1>!!! The Pig has won !!!</h1>`);
    }
  });

})
