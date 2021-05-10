let canvas = document.getElementById('gamecontainer');
let ctx = canvas.getContext('2d');


function up(e) {

}
function down(e) {

}
function left(e) {

}
function right(e) {

}
document.addEventListener("keydown" , down);
document.addEventListener("keyup" , up);
document.addEventListener("keyleft" , left);
document.addEventListener("keyright" , right);




let img = new Image();   
img.src = 'assets/test2.png'; 
let img2 = new Image();
img2.src = "assets/test.png";





function mainLoop() {
   
    console.log('looping');
    ctx.drawImage(img , 50, 50);
    ctx.drawImage(img2 , 100 , 100);
    console.log("Image 1 width: " + img.width);
    console.log("Image 2 width: " + img2.width);
}

setInterval(mainLoop, 500);