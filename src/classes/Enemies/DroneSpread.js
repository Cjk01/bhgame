import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";

export default class DroneSpread extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setHp(5);
		this.setValue(100);
		this.setStepCounter(20);
		this.setStepLimit(20);
		this.setMovementSpeed(220);
		this.setShootingAnimationKey("DroneSpreadShoot");
		this.play({ key: "DroneSpeadIdle", repeat: -1 });
		this.on("animationcomplete", () => {
			this.play({ key: "DroneSpeadIdle", repeat: -1 });
		});

		this.setBulletPatterns([
			[20, 5, 10, "PurpleBall", 150, 0, 20],
			[50, 5, 10, "PurpleBall", 150, 0, 20],
			[80, 5, 10, "PurpleBall", 150, 0, 20],
			[110, 5, 10, "PurpleBall", 150, 0, 20],
			[140, 5, 10, "PurpleBall", 150, 0, 20],
			[170, 5, 10, "PurpleBall", 150, 0, 20],
		]);
	}
}
