let obstacles = []
let minObstacleTime = 50
let obstacleTimer = 0
let randomAddition = 0

let birds = []

let grounds = []
let groundCounter = 0
let groundHeight = 306

let play = false
let speed = 10
let score = 0
let highScore = 0
let populationSize = 200
let gen = 1
let highGen = 1

let dinos = []
let savedDinos = []

//IMAGES
let drun1image
let drun2image
let djumpimage
let dduck1image
let dduck2image
let bimage
let smallCactusImage
let largeCactusImage
let manyCactiImage
let bird1Image
let bird2Image

function preload() {
  drun1image = loadImage("game/altImages/dinorun1.png")
  drun2image = loadImage("game/altImages/dinorun2.png")
  djumpimage = loadImage('game/altImages/dinojump.png')
  dduck1image = loadImage('game/altImages/dinoduck1.png')
  dduck2image = loadImage('game/altImages/dinoduck2.png')
  largeCactusImage = loadImage('game/altImages/cactusBig.png')
  smallCactusImage = loadImage('game/altImages/cactusSmall.png')
  manyCactiImage = loadImage('game/altImages/cactusSmallMany.png')
  bird1Image = loadImage('game/altImages/bird.png')
  bird2Image = loadImage('game/altImages/bird2.png')
  bimage = loadImage('game/altImages/background.png')
}

function setup() {
  var canvasDiv = document.getElementById('jumbo-canvas');
  var width = canvasDiv.offsetWidth;
  var sketchCanvas = createCanvas(width - 200, 350);
  sketchCanvas.parent("jumbo-canvas");
  sketchCanvas.mouseClicked(begin)

  tf.setBackend('cpu')

  for (i = 0; i < populationSize; i++){
    dinos[i] = new Dino()
  }
 }
 
function begin() {
  play = true
}

function keyPressed() {
  if (key === 'S') {
    let dino = dinos[0];
    saveJSON(dino.brain, 'dino.json');
  }
}



function draw() {
  if (play == false) {
    background(255)
  }
  if (play == true) {
    background(bimage);
    writeToScreen()
    score++
    if (score > highScore) {
      highScore = score
      highGen = gen
    } 
    updateObstacles()
    
    for (let dino of dinos) {
      dino.think()
    }
    updateDinos()
    if (dinos.length === 0) {
      gen++
      setUpNextGen()
    }
  }
 }

function updateObstacles() {
  obstacleTimer++
  //speed += 0.002
  if (obstacleTimer > minObstacleTime + randomAddition) { //if the obstacle timer is high enough then add a new obstacle
    addObstacle();
  }
  groundCounter ++;
  if (groundCounter> 5) { //every 5 frames add a ground bit
    groundCounter = 0;
    grounds.push(new Ground());
  }
  
  moveObstacles()//move everything
  showObstacles()
}

//every so often add an obstacle 
function addObstacle() {
  //var lifespan = pop.populationLife;
  let tempInt
  if (score > 500 && random(1) < 0.20) { // 15% of the time add a bird
    tempInt = floor(random(3));
    let temp = new Bird(tempInt);
    birds.push(temp);
  } else {//otherwise add a cactus
    tempInt = floor(random(3));
    let temp = new Obstacle(tempInt);
    obstacles.push(temp);
    //tempInt += 3
  }
  obstacleTimer = 0;
  randomAddition = floor(random(50))
}

function updateDinos() {
  for (i = 0; i < dinos.length; i++) {
    dinos[i].show()
    dinos[i].move()
  }
  for (b = 0; b < birds.length; b++){
    for (i = dinos.length - 1; i >= 0; i--){
      if (dinos[i].collides(birds[b])) {
        if (dinos[i].localScore - 300 > 0) {
          dinos[i].localScore -= 300
        } else {
          dinos[i].localScore = 1
        }
        savedDinos.push(dinos.splice(i, 1)[0]);
      }
    }
  }
  for (o = 0; o < obstacles.length; o++){
    for (i = dinos.length - 1; i >= 0; i--){
      if (dinos[i].collides(obstacles[o])) {
        if (dinos[i].localScore - 300 > 0) {
          dinos[i].localScore -= 300
        } else {
          dinos[i].localScore = 1
        }
        savedDinos.push(dinos.splice(i, 1)[0]);
      }
    }
  }
  
}

function moveObstacles() {
  for (i = obstacles.length - 1; i >= 0 ; i--) {
    obstacles[i].move(speed);
    if (obstacles[i].isOffscreen()) { 
      obstacles.splice(i, 1);
    }
  }
  
  for (i = birds.length - 1; i >= 0 ; i--) {
    birds[i].move(speed);
    if (birds[i].isOffscreen()) { 
      birds.splice(i, 1);
    }
  }
  
  for (i = grounds.length - 1; i >= 0 ; i--) {
    grounds[i].move(speed);
    if (grounds[i].isOffscreen()) { 
      grounds.splice(i, 1);
    }
  }
}

function showObstacles() {
  for (i = 0; i< grounds.length; i++) {
    grounds[i].show();
  }
  for (i = 0; i< obstacles.length; i++) {
    obstacles[i].show();
  }
  for (i = 0; i< birds.length; i++) {
    birds[i].show();
  }
}

function writeToScreen() {
  textSize(25);
  let twidth = textWidth('Score: ' + score)
  text('Score: ' + score, width / 2 - twidth / 2, 30);
  fill(0, 102, 153);
  let twidth2 = textWidth("High Score: " + highScore + " (" + "Gen: " + highGen + ")")
  text("High Score: " + highScore + " (" + "Gen: " +  highGen + ")", width - twidth2, 30)
  fill(0, 102, 153);
  text('Gen: ' + gen, 0, 30);
  fill(0, 102, 153);
  text('Num Alive: ' + dinos.length, 0, 60);
  fill(0, 102, 153);
}

function setUpNextGen() {
  score = 0
  speed = 10
  obstacles = []
  birds = []
  grounds = []
  nextGeneration()
}

function windowResized() {
  var canvasDiv = document.getElementById('jumbo-canvas');
  var width = canvasDiv.offsetWidth;
  resizeCanvas(width - 200, 350);
 }