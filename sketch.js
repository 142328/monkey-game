
var monkey , monkey_running
var bananna ,banannaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var Survivaltime
var ground,invisibleground;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

function preload()
{
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
         
  banannaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,350);
  
  ground=createSprite(300,350,1200,10);
  ground.x=ground.width/2 ;

  monkey = createSprite(300,350,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.x = 50;
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
  Survivaltime = 0;
  }


function draw() 
{
   background("white");
  
   text("Survivaltime: "+ Survivaltime, 500,50);
 
 
      
  if(ground.x<0){
   ground.x=width/2 ; 
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  ground.velocityX = -5;
  
  monkey.collide(ground);
  
  if(FoodGroup.isTouching(monkey))
  {
     Survivaltime = Survivaltime+2;
     FoodGroup.destroyEach();
  }
  
  if(obstaclesGroup.isTouching(monkey))
   {
     gamestate = END;
   } 
  if (gamestate === END) 
    {
      ground.velocityX = 0;
      monkey.velocityY = 0 
      FoodGroup.destroyEach();
      obstaclesGroup.destroyEach();
      Survivaltime = 0;
      gamestate = PLAY;
    }
  if(gamestate===PLAY)
    {
      monkey.x = 30;  
      if(keyDown("space")&& monkey.y >= 100) 
  {
     monkey.velocityY = -5;
  } 
      spawnObstacles();
      spawnFood();
      
     
    }
  spawnObstacles();
  spawnFood();
  
drawSprites();  
}

function spawnObstacles()
{
 if (frameCount % 300 === 0)
 {
   var obstacle = createSprite(ground.x,300,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacle.velocityX = -5;
   obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);
 }
}
 
function spawnFood()
{
 if (frameCount % 80 === 0)
 {
  var bananna = createSprite(200,Math.round(random(120, 200)), 10, 10);
   bananna.addImage(banannaImage);
   bananna.scale = 0.1;
   bananna.velocityX = -5;
   bananna.lifetime = 300;
   FoodGroup.add(bananna);
 } 
}



