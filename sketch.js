var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 5;
  
  ghost =createSprite(300,300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale=0.4;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("up")){
      ghost.y= ghost.y -5
    }

    if(keyDown("right")){
      ghost.x= ghost.x +5
    }

    if(keyDown("left")){
      ghost.x= ghost.x -5
    }

    ghost.y= ghost.y +0.5 

    spawnDoorsAndClimbers();    

    drawSprites()

    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0

    }

    if(ghost.y>height || ghost.isTouching(invisibleBlockGroup)){
      gameState = "END"
    }
  }
else{
  text("Game Over", 300,300);

}

  
}
function spawnDoorsAndClimbers(){
  if(frameCount % 150 === 0){
    var door= createSprite(10,0);
    door.velocityY = +8
    door.x = Math.round(random(60, 500));
    door.addImage("door", doorImg);
    door.depth= ghost.depth;
    ghost.depth = ghost.depth +1

    var climber= createSprite(door.x, 50);
    climber.velocityY= door.velocityY;
    climber.addImage("climber", climberImg);

    var invisibleBlock= createSprite(door.x, 50, 100, 5);
    invisibleBlock.velocityY= door.velocityY;


    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

  }
  
}