
import * as logger from "./expTest.js";
import * as movement from "./movement.js";

//checking for webgl support
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
    }

PIXI.utils.sayHello(type);
logger.log("logger working");
//Create a Pixi Application
let app = new PIXI.Application({width: 500, height: 700});
app.renderer.view.style.position = "absolute";
app.renderer.view.style.left = "30%";

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
// load the texture we need

app.loader.add('player', 'assets/playerSprites/PlayerShipIdle1.png')
    .add('background' , 'assets/Background/BackgroundMoon.png')
    .load((loader) => {setup(loader)});
function setup(loader){
    console.log("setting up..")
    // This creates a texture from an img
    let background = new PIXI.Sprite(loader.resources.background.texture);
    let player = new PIXI.Sprite(loader.resources.player.texture);
    
    // Setup the position of the player
    player.x = 250;
    player.y = 600;
    player.vy = 0;
    player.vx = 0;

    // movement controls boilerplate

    let left = movement.keyboard("ArrowLeft"),
    up = movement.keyboard("ArrowUp"),
    right = movement.keyboard("ArrowRight"),
    down = movement.keyboard("ArrowDown");
    up.press = () => {
        
        player.vy = -5;
    };
    up.release = () => {
        if(!(down.isDown) ){
        player.vy = 0;
        }
        
    };
    down.press = () => {
        
        player.vy = 5;
    };
    down.release = () => {
        if(!(up.isDown) ){
            player.vy = 0;
        }
        
    };
    left.press = () => {
        
        player.vx = -5;
    };
    left.release = () => {
        if(!(right.isDown)){
        player.vx = 0;
        }
        
    };
    right.press = () => {
        
        player.vx = 5;
    };
    right.release = () => {
        if(!(left.isDown) ){
        player.vx = 0;
        }
        
    };

    
    //rendering all
    app.stage.addChild(background);
    app.stage.addChild(player);
    
    
    function mainLoop(){
        console.log("main loop..");
        // call movement function and update positions
        movement.updatePlayerPosition(player);
        
        // call collision detection function
        
    }
    // Listen for frame updates
    app.ticker.add(() => { 

        mainLoop();
    });
}