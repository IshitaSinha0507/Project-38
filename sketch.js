//gameState
var PLAY = 1;
var END = 0;
var gameState = 1;

var bird,birdImg;
var backGround,backgroundImg;
var obstacleGroup,obstacle1,obstacle2;
var coins,coinsImg,coinGroup;
var score ;
var restartImg,gameOverImg;
var restart,gameOver;
var clouds;
var sree1,sree2;

function preload(){
    birdImg = loadImage("bird.png");
    backgroundImg = loadImage("background.png");
    coinsImg = loadImage("coin.png");
    restartImg = loadImage("Start.png");
    gameOverImg = loadImage("Game-over.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    clouds = loadImage("clouds.png");
}
function setup(){
    createCanvas(800,600);

    backGround = createSprite(400,300);
    backGround.addImage(backgroundImg);
    //backGround.scale = 0.7;
    backGround.velocityX = -4;

    bird = createSprite(50,300,40,40);
    bird.addImage(birdImg);
    //bird.debug = true;
    bird.scale = 0.2;

    restart = createSprite(400,400,40,40);
    restart.addImage(restartImg);
    restart.scale = 0.5;
    restart.visible = false;

    gameOver = createSprite(400,140,40,40);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 2;
    gameOver.visible = false;

    coinsGroup = new Group();
    obstacleGroup = new Group();

    sree1=createSprite(200,700,300,10)
    sree1.visible=false;
    
    sree2=createSprite(200,100,300,10)
    sree2.visible=false;

    score = 0;
}
function draw(){
   background(clouds)
    if(gameState === PLAY){
        Spawncoins();
        SpawnObstacles();
        SpawnObstacle();

    //Moving background
    if (backGround.x < 0) {
            backGround.x = backGround.width / 3;
         }
         camera.position.y = bird.y


    //Code to make the bird fly
    if(keyWentDown("space")||(mouseIsPressed) ){
            bird.velocityY=-7;
        }
        bird.velocityY= bird.velocityY+1;

        //adjust the depth
    gameOver.depth = restart.depth;
    restart.depth = restart.depth + 1;

    //Score
    if(bird.isTouching(coinsGroup)){
        score = score + 1;
        coinsGroup.destroyEach();
      } 
      if(bird<600){
          gameState = 0;
      }
      if(obstacleGroup.isTouching(bird)||bird.isTouching(sree1)||bird.isTouching(sree2)){
        gameState = END;
    }  
     
    }else if(gameState === 0){

    bird.velocityY = 0;
    restart.visible = true;
    gameOver.visible = true;
    
    if(mousePressedOver(restart)){
      reset();
    }
    obstacleGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);

   //set lifetime of the game objects so that they are never destroyed
   obstacleGroup.setLifetimeEach(-1);
   coinsGroup.setLifetimeEach(-1);
    }

    drawSprites();

    textSize(20);
    stroke("white");
    fill("white");
    text("Score : " + score,650,50);
    text("Press space for flying",30,bird.y-50)
}
function Spawncoins(){
    if (frameCount % 250 === 0) {
        var coins = createSprite(900,120,40,10);
        coins.y = Math.round(random(80,500));
        coins.addImage(coinsImg);
        coins.scale = 0.2;
        coins.velocityX = -3;
        coins.lifetime = 500;
    
    coinsGroup.add(coins);
      
  }
  }
  function SpawnObstacles(){
      if(frameCount % 200 === 0){
          var obstacle = createSprite(400,500,50,20);
          obstacle.x =Math.round(random(900,900));
          obstacle.addImage(obstacle1);
          obstacle.scale = 0.3
          obstacle.velocityX = -5;
          obstacle.lifetime = 200;

        obstacleGroup.add(obstacle);
        }
    }
    function SpawnObstacle(){
        if(frameCount % 150 === 0){
            var obstacle = createSprite(400,10,50,20);
            obstacle.x =Math.round(random(900,900));
            obstacle.addImage(obstacle2);
            obstacle.scale = 0.4;
            obstacle.velocityX = -5;
            obstacle.lifetime = 200;
  
          obstacleGroup.add(obstacle);
          }
      }
      function reset(){
  
        gameState = PLAY;
        score = 0;
        restart.visible = false;
        gameOver.visible = false;
        bird.x = 100;
        bird.y = 300;
        backGround.x = 400;
        backGround.y = 300;
        obstacleGroup.destroyEach();
        coinsGroup.destroyEach();
      }