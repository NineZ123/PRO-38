var backGroundImage,backGround;
var monkey, monkey_running
var ground, ground_img

var obstaclesGroup, obstacles_img;
var bananaGroup, banana_img
var gameState="play";

var score=0;
var gameoverIMG, gameover;

function preload(){
  backGroundImage=loadImage("jungle.jpg")
monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
gameoverIMG=loadImage("GameOver.PNG")
  banana_img=loadImage("banana.png");
  obstacles_img=loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);
  
  backGround=createSprite(0,0,800,400);
  backGround.addImage(backGroundImage);
  backGround.scale=1.5;
  backGround.x=backGround.width/2;
  backGround.velocityX=-4;
  
gameover=createSprite(400,200,50,50);
gameover.addImage(gameoverIMG);

  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  ground.velocityX=-4;
  
  BananaGroup= new Group();
  obstaclesGroup= new Group();
  
  score = 0;
}

function draw() {
 createCanvas(displayWidth,displayHeight/2)
  background(255);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
 console.log(gameState);
  camera.position.x = monkey.x;
  
  if(gameState === "play") {
  gameover.visible=false;
    if (keyDown("space") && monkey.y>240) {
    
      monkey.velocityY = -13;
    }
    monkey.velocityY = monkey.velocityY+1;
    
    if(BananaGroup.isTouching(monkey)){
      BananaGroup.destroyEach();
    score = score + 2;
    }
    if (score === -2){
gameState = "end";

    }
    else if (gameState === "end"){
      monkey.velocityX=0;
      gameover.visible=true;
      monkey.visible=false;
      BananaGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);
    
    }
  if(ground.x<0){
  ground.x=ground.width/2  
  
       
}
monkey.collide(ground)  
  if(backGround.x<100){
    backGround.x = backGround.width/2;
    
  }
   

 
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }


  
  if(obstaclesGroup.isTouching(monkey)){ 
     
     score=score-1; 
    }
  
    spawnBanana();
    spawnObstacles();
  

  drawSprites();
  
  
}

function spawnBanana(){

if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(banana_img);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    BananaGroup.add(banana);
    
  }
}
function spawnObstacles(){
if(frameCount%300===0) {  
   var obstacle=createSprite(400,350,20,20)
  
   obstacle.addImage(obstacles_img);
  
  obstaclesGroup.add(obstacle);
  
  obstacle.scale=0.3;
  
  obstacle.velocityX=-7;

  obstacle.lifetime=200
  
  monkey.depth=obstacle.depth+1;

}
}}
