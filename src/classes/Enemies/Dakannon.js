import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";

export default class Dakannon extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);

		this.setHp(6);
		this.setValue(20);
		this.setStepCounter(80);
		this.setStepLimit(80);
		this.setBulletPatterns([
			[90, 2, 40, "RedSwirl-L", 150, 0, 30],
			[120, 3, 40, "RedSwirl-L", 150, 0, 30],
			[90, 2, 60, "BlueSwirl-L", 150, 0, 30],
			[60, 4, 30, "BlueSwirl-L", 150, 0, 30],
			[90, 3, 30, "RedSwirl-L", 150, 0, 30],
			[60, 3, 30, "RedSwirl-L", 150, 0, 30],
		]);
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
