import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";

export default class Charger extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setHp(8);
		this.setValue(30);
		this.setStepCounter(60);
		this.setStepLimit(60);
		this.setMovementSpeed(120);
		this.setBulletPatterns([
			[-180, 12, 30, "GreenBall", 50, 0, 0],
			[-160, 12, 30, "GreenBall", 50, 0, 0],
			[160, 12, 30, "PurpleBall", 50, 0, 0],
			[180, 12, 30, "PurpleBall", 50, 0, 0],
			[120, 12, 30, "BlueSwirl-L", 50, 0, 0],
			[140, 12, 30, "BlueSwirl-L", 50, 0, 0],
		]);
		this.play({
			key: "ChargerIdle",
			repeat: -1,
		});
	}
}
