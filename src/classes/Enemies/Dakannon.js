import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";

export default class Dakannon extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);

		this.setHp(6);
		this.setValue(120);
		this.setStepCounter(80);
		this.setStepLimit(80);
		this.setShootingAnimationKey("DakanShoot");
		this.setBulletPatterns([
			[70, 10, 10, "BlueBall", 150, 0, 30],
			[60, 10, 10, "RedBall", 500, 0, 30],
			[80, 5, 5, "BlueBall", 400, 0, 30],
		]);
		this.on("animationcomplete", () => {
			this.shoot();
			this.play({ key: "DakanIdle", repeat: -1 });
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
