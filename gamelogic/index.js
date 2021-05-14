import * as logger from "./expTest.js";
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
app.loader.add('player', 'assets/playerSprites/PlayerShipIdle1.png').load((loader, resources) => {
    // This creates a texture from an img
    const player = new PIXI.Sprite(resources.player.texture);

    // Setup the position of the player
    player.x = app.renderer.width / 2;
    player.y = app.renderer.height / 2;

  
    // Add the bunny to the scene we are building
    app.stage.addChild(player);
    
    function mainLoop(){
        
        console.log("looping");
       

        
    }
    // Listen for frame updates
    app.ticker.add(() => {
         
        mainLoop();
        
    });
});