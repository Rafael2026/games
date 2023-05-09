const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
let x = 0;
const playerImage = new Image();
const spriteWidth = 6876/12;
const spriteHeight = 5230/10;
let frameX = 0;
let frameY = 5;
let gameFrame = 0;
let staggerFrames = 5;
const spriteAnimarions = [];
const animationStates = [
  { name: 'idle', frames: 7, },
  { name: 'jump', frames: 7, }
];

playerImage.src = 'img/shadowDog.png';
canvas.width = 600;
canvas.height = 600;

function animate() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //ctx.fillRect(50, 50, 100, 100);
  //ctx.drawImage(playerImage, 50, 50);

  let position = Math.floor(gameFrame/staggerFrames) % 6;
  frameX = spriteWidth * position;

  ctx.drawImage(playerImage, frameX, (frameY * spriteHeight), spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
  
  /*if (gameFrame%staggerFrames == 0) {

    if (frameX < 4) {
      frameX++;
    } else {
      frameX = 0;
    }
  }*/

  gameFrame++;
  requestAnimationFrame(animate);
};

animate();
