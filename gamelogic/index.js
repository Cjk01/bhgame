import w from "wee.js";

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
    }
PIXI.utils.sayHello(type);
//Create a Pixi Application
let app = new PIXI.Application({width: 500, height: 700});
app.renderer.view.style.position = "absolute";
app.renderer.view.style.left = "30%";
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
// load the texture we need
app.loader.add('bunny', 'assets/playerSprites/PlayerShipIdle1.png').load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    const bunny = new PIXI.Sprite(resources.bunny.texture);

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny);

    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
    });
});