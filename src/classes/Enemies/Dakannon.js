import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
import TrackingBullet from "../Bullets/TrackingBullet.js";

export default class Dakannon extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);

		this.setHp(6);
		this.setValue(20);
		this.setStepCounter(180);
		this.setStepLimit(180);

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
	shoot() {
		this.shootAtAngle(
			this.scene.getRandomInt(0, 81),
			5,
			20,
			"RedSpiral-L",
			150,
			0,
			20
		);
	}
}
