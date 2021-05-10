
import {model} from "model.js"

let canvas = document.getElementById('gamecontainer');
let ctx = canvas.getContext('2d');
let player = new model.player();
document.addEventListener("keydown" ,player.down);
document.addEventListener("keyup" , player.up);
document.addEventListener("keyleft" , player.left);
document.addEventListener("keyright" , player.right);
document.addEventListener("spacebar" , player.shoot);
let img = new Image();   
img.src = 'assets/sprites/testSprites/test2.png'; 
let img2 = new Image();
img2.src = "assets/sprites/testSprites/test.png";
let enemy = new model.enemy();





function mainLoop() {
   
    console.log('looping');
    ctx.drawImage(img , 50, 50);
    ctx.drawImage(img2 , 100 , 100);
    console.log("Image 1 width: " + img.width);
    console.log("Image 2 width: " + img2.width);
}

setInterval(mainLoop, 500);