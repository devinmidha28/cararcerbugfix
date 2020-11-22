var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

function preload(){
  preloadimage1 = loadImage("../images/car1.png")
  preloadimage2 = loadImage("../images/car2.png")
  preloadimage3 = loadImage("../images/car3.png")
  preloadimage4 = loadImage("../images/car4.png")
  preloadimage5 = loadImage("../images/track.jpg")
  preloadimage6 = loadImage("../images/track.png")

}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if (gameState==2){
    console.log("GAME END");
  }

  if(gameState === 1){
    clear();
    game.play();
  }
}
