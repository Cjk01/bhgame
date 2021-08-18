import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";

export default class Charger extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setHp(8);
		this.setValue(30);
		this.setStepCounter(5);
		this.setStepLimit(5);
		this.setMovementSpeed(120);
		this.setShootingAnimationKey("ChargerIdle");
		this.setBulletPatterns([
			[20, 1, 0, "BlueBall", 100, 0, 20],
			[40, 1, 0, "BlueBall", 100, 0, 20],
			[60, 1, 0, "BlueBall", 100, 0, 20],
			[80, 1, 0, "BlueBall", 100, 0, 20],
			[100, 1, 0, "BlueBall", 100, 0, 20],
			[120, 1, 0, "BlueBall", 100, 0, 20],
			[140, 1, 0, "BlueBall", 100, 0, 20],
			[160, 1, 0, "BlueBall", 100, 0, 20],
			[140, 1, 0, "PurpleBall", 100, 0, 20],
			[120, 1, 0, "PurpleBall", 100, 0, 20],
			[100, 1, 0, "PurpleBall", 100, 0, 20],
			[80, 1, 0, "PurpleBall", 100, 0, 20],
			[60, 1, 0, "PurpleBall", 100, 0, 20],
			[40, 1, 0, "PurpleBall", 100, 0, 20],
			[20, 1, 0, "PurpleBall", 100, 0, 20],
		]);
		this.play({
			key: "ChargerIdle",
			repeat: -1,
		});
	}
}
