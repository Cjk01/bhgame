let canvas = document.getElementById('gamecontainer');
let ctx = canvas.getContext('2d');
let img = new Image();   // Create new img element
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