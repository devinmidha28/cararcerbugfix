class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("a",preloadimage1)
    car2 = createSprite(300,200);
    car2.addImage("b",preloadimage2)
    car3 = createSprite(500,200);
    car3.addImage("c",preloadimage3)
    car4 = createSprite(700,200);
    car4.addImage("d",preloadimage4)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
   
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      image(preloadimage5,0,-20*displayHeight,displayWidth,21*displayHeight)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x1 = 0;
      var y1;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x1 = x1 + 250;
        //use data form the database to display the cars in y direction
        y1 = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x1;
        cars[index-1].y = y1;

        if (index === player.index){
        //  fill ("red");
          //ellipse(x1,y1,200,200);  
          console.log("hello");
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    //console.log(player.distance); 
    if (player.distance>10000){
      gameState=2
    }

    drawSprites();
  }
}
