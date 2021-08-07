import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";

export default class Dakannon extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);

		this.setHp(6);
		this.setValue(20);
		this.setStepCounter(200);
		this.setStepLimit(200);

		this.on("animationcomplete", () => {
			this.play({ key: "DakanIdle", repeat: -1 });
			this.shoot();
		});
		this.play({
			key: "DakanIdle",
			repeat: -1,
		});
	}

	move() {
		if (this.getStepCounter() >= this.getStepLimit()) {
			this.play({ key: "DakanTeleportStart", repeat: 0 });
			this.x = this.scene.getRandomInt(0, this.scene.game.canvas.width);
			this.y = this.scene.getRandomInt(0, this.scene.game.canvas.height / 2);
			this.setStepCounter(0);
		}
	}
}
