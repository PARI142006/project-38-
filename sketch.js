var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girl_running, girl_collided;
var ground, invisibleGround, groundImage;

var treeGroup, tree, treeImage;
var sprite;

var score=0;

var gameOver, restart;



function preload(){
  girl_running =   loadAnimation("run_1.png","run_2.png","run_3.png","run_4.png","run_5.png","run_6.png","run_7.png","run_8.png","run_9.png","run_10.png","run_11.png","run_12.png","run_13.png","run_14.png","run_15.png","run_16.png","run_17.png","run_18.png","run_19.png","run_20.png");
  girl_collided = loadAnimation("dead9.png","dead10.png","dead11.png","dead12.png");
  
  groundImage = loadImage("cutie.jpg");
  
 treeImage = loadImage("c41e11f03957a3bea3ae3919c9084d4e.png");
  
  
  gameOverImg = loadImage("gameo.png");
  restartImg = loadImage("images.jpg");
}

function setup() {
  createCanvas(500, 300);
  
  
  
  ground = createSprite(200,100,100,200);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(2 + score/1000);
  
  girl = createSprite(80,180,34,34);
  
  girl.addAnimation("running", girl_running);
  girl.addAnimation("collided", girl_collided);
  girl.scale = 0.2;
  //girl.debug=true
  
  
  
  gameOver = createSprite(300,130);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(450,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 1;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,250,300,10);
  invisibleGround.visible = false;
  
  
  treeGroup = new Group();
  
  sprite= createSprite(93,43,156,43)
  sprite.shapeColor="yellow"
  score = 0;
}

function draw() {
 
  background(255);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(0.5 + score/1000);
  
    if(keyDown("space") && girl.y >= 159) {
      girl.velocityY = -12;
    }
  
    girl.velocityY = girl.velocityY + 0.8
  
    if (ground.x < 250){
      ground.x = ground.width/2;
    }
  
    girl.collide(invisibleGround);
    spawnTrees();
  
    if(treeGroup.isTouching(girl)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    girl.velocityY = 0;
   treeGroup.setVelocityXEach(0);
    
    girl.changeAnimation("collided",girl_collided)
    
    
    treeGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();

  fill("magenta");
  textSize(21)
  text("Score: "+ score, 50,50);
  
}

function spawnTrees() {
  if(frameCount % 80 === 0) {
    var tree = createSprite(600,195,20,40);
    //tree.debug=true
    tree.setCollider("circle",0,0,40)
    tree.velocityX = -(6 + 3*score/100);
    tree.addImage(treeImage)
    tree.scale=0.2
           
   
    tree.lifetime = 300;
    //add each obstacle to the group
    treeGroup.add(tree);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  treeGroup.destroyEach();
  
  
  girl.changeAnimation("running",girl_running);
  
  
  
  score = 0;
  
}