import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
export default class Eyeball extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setHp(6);
		this.setValue(90);
		this.setStepCounter(25);
		this.setStepLimit(25);
		this.setMovementSpeed(300);
		this.setShootingAnimationKey("EyeBallShoot");
		this.on("animationcomplete", () => {
			this.play({ key: "EyeBallIdle", repeat: -1 });
		});
		this.play({ key: "EyeBallIdle", repeat: -1 });

		this.setBulletPatterns([
			[-180, 12, 30, "RedBall", 50, 0, 0],
			[-140, 12, 30, "RedBall", 150, 0, 0],
			[-100, 12, 30, "RedBall", 100, 0, 0],
			[-140, 12, 30, "RedBall", 50, 0, 0],
		]);
	}
}
