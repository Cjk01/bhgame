import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
export default class Eyeball extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setHp(6);
		this.setValue(40);
		this.setStepCounter(200);
		this.setStepLimit(200);
		this.setMovementSpeed(2);
		this.on("animationcomplete", () => {
			this.play({ key: "EyeBallIdle", repeat: -1 });
			this.shoot();
		});
		this.play({ key: "EyeBallIdle", repeat: -1 });
	}

	move() {
		if (this.getStepCounter() >= this.getStepLimit()) {
			this.play({ key: "EyeBallShoot", repeat: 0 });
			this.x = this.scene.getRandomInt(0, this.scene.game.canvas.width);
			this.setStepCounter(0);
		}
	}
	shoot() {
		this.shootAtAngle(-180, 12, 30, "RedBall", 50, 0, 0);
	}
}
