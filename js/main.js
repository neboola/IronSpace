$(document).ready(() => {
  var audio = new Audio('audio/BeepBox-Song.mp3');
  var game = new Game();
  var newSpaceShip = new SpaceShip();
  var newPlanets = new Planets(
    game.planet[0],
    game.planet[1],
    game.planet[2],
    game.planet[3]
  );
  var newPlanets2 = new Planets(
    game.planet2[0],
    game.planet2[1],
    game.planet2[2],
    game.planet2[3]
  );
  var newGoal = new Goal(game.goal[0], game.goal[1]);

  // $("#button-start").click(function() {
  //   startGame();
  // });

  $(document).keypress(function(e) {
    audio.play();
    newSpaceShip.move(e.which);
    game.start(e.which);
  });
  function startGame() {
    //Carica schermata inziale
    if (game.frame == 0) {
      game.firstFrameDraw(newSpaceShip.ctx);
    }
    //Incomincia la partita
    if (game.frame != 0 && game.frame != 4) {
      update();
      draw();
    } else if (game.frame == 4) {
      //Schermata vittoria
      game.winFrame(newSpaceShip.ctx);
    }
  }
  setInterval(startGame, 1);

  function draw() {
    newSpaceShip.draw();
    newPlanets.draw(newSpaceShip.ctx);
    newGoal.draw(newSpaceShip.ctx);
    newPlanets2.draw(newSpaceShip.ctx);
  }

  function update() {
    newSpaceShip.update(newPlanets);
    newSpaceShip.update(newPlanets2);
    newGoal.update(newSpaceShip);
    newPlanets.collision(newSpaceShip);
    newPlanets2.collision(newSpaceShip);
    if (newGoal.collision) {
      game.level();
      newGoal = new Goal(game.goal[0], game.goal[1]);
      newPlanets = new Planets(
        game.planet[0],
        game.planet[1],
        game.planet[2],
        game.planet[3]
      );
      newPlanets2 = new Planets(
        game.planet2[0],
        game.planet2[1],
        game.planet2[2],
        game.planet2[3]
      );
      newSpaceShip.posX = 50;
      newSpaceShip.posY = newSpaceShip.canvas.height / 2;
      newSpaceShip.angle = 0;
      newSpaceShip.speed = 0;
      newSpaceShip.dx = 0;
      newSpaceShip.dy = 0;
      newGoal.collision = false;
    }
  }
});