
let canvas = document.getElementById('gamecontainer');
let ctx = canvas.getContext('2d');
let playerX = 250;
let playerY = 600;
let currentPlayerSprite = new Image();
currentPlayerSprite.src = "assets/playerSprites/PlayerShipIdle1.png";
function handleKeyDown(e) {
    switch(e) {
        //
    }
}

function up(e) {
    console.log(e + "pressed");
    playerY--;
  
    
}
function down(e) {
    console.log(e + "pressed");
    playerY++;
}
function left(e) {
    console.log(e + "pressed");
    playerX--;
}
function right(e) {
    console.log(e + "pressed");
    playerX++;
}
function shoot(e) {
    console.log(e + "pressed");
    currentPlayerSprite.src = "../assets/playerSprites/PlayerShipIdle2.png"
    
}
document.addEventListener("onkeydown" ,handleKeyDown);






function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log('looping');
    ctx.drawImage(currentPlayerSprite , playerX, playerY);
    console.log("player X : " + playerX + " player Y: " + playerY);
    
}

setInterval(mainLoop, 5);