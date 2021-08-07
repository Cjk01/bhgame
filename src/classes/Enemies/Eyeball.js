import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
export default class Eyeball extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setHp(6);
		this.setValue(40);
		this.setStepCounter(50);
		this.setStepLimit(50);
		this.setMovementSpeed(300);

		this.on("animationcomplete", () => {
			this.play({ key: "EyeBallIdle", repeat: -1 });
			this.shoot();
		});
		this.play({ key: "EyeBallIdle", repeat: -1 });

		this.setBulletPatterns([
			[-180, 12, 30, "RedBall", 50, 0, 0],
			[-160, 12, 30, "RedBall", 50, 0, 0],
			[-140, 12, 30, "RedBall", 50, 0, 0],
			[-120, 12, 30, "RedBall", 50, 0, 0],
			[-200, 12, 30, "RedBall", 50, 0, 0],
			[-220, 12, 30, "RedBall", 50, 0, 0],
		]);
	}
}
