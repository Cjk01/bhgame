import Phaser from "./lib/phaser.js";
import Game from './scenes/Game.js'
console.log("app.js loaded");

export default new Phaser.Game ({
    type: Phaser.AUTO,
    width: 500,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: Game
    
})

