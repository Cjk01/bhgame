import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
export default class Eyeball extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setHp(6);
		this.setValue(40);
		this.setStepCounter(100);
		this.setStepLimit(100);
		this.setMovementSpeed(300);

		this.on("animationcomplete", () => {
			this.play({ key: "EyeBallIdle", repeat: -1 });
			this.shoot();
		});
		this.play({ key: "EyeBallIdle", repeat: -1 });
		this.setBulletPatterns([[-180, 12, 30, "RedBall", 50, 0, 0]]);
	}
}
