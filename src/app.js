import Phaser from "./lib/phaser.js";
import Game from "./scenes/Game.js";

console.log("app.js loaded");

export default new Phaser.Game({
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 500,
		height: 700,
	},
	parent: "container",
	autoCenter: Phaser.Scale.CENTER_BOTH,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: true,
		},
	},
	scene: Game,
});
