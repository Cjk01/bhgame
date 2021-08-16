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
		this.setBulletPatterns([
			[20, 1, 0, "BlueBall", 80, 0, 0],
			[40, 1, 0, "BlueBall", 75, 0, 0],
			[60, 1, 0, "BlueBall", 70, 0, 0],
			[80, 1, 0, "BlueBall", 65, 0, 0],
			[100, 1, 0, "BlueBall", 60, 0, 0],
			[120, 1, 0, "BlueBall", 60, 0, 0],
			[140, 1, 0, "BlueBall", 60, 0, 0],
			[160, 1, 0, "BlueBall", 80, 0, 0],
			[140, 1, 0, "PurpleBall", 80, 0, 0],
			[120, 1, 0, "PurpleBall", 75, 0, 0],
			[100, 1, 0, "PurpleBall", 70, 0, 0],
			[80, 1, 0, "PurpleBall", 65, 0, 0],
			[60, 1, 0, "PurpleBall", 60, 0, 0],
			[40, 1, 0, "PurpleBall", 60, 0, 0],
			[20, 1, 0, "PurpleBall", 60, 0, 0],
		]);
		this.play({
			key: "ChargerIdle",
			repeat: -1,
		});
	}
}
