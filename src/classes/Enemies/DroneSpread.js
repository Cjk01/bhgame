import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
import SinewaveBullet from "../Bullets/SinewaveBullet.js";
export default class DroneSpread extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setHp(5);
		this.setValue(30);
		this.setStepCounter(360);
		this.setStepLimit(360);
		this.setMovementSpeed(200);
		this.play({ key: "DroneSpeadIdle", repeat: -1 });
		this.on("animationcomplete", () => {
			this.play({ key: "DroneSpeadIdle", repeat: -1 });
		});
	}

	shoot() {
		if (this.getStepCounter() >= 0) {
			this.shootAtAngle(this.getStepCounter(), 3, 30, "RedBall", 50, 0, 0);
			this.play({ key: "DroneSpreadShoot", repeat: 5 });
			this.setStepCounter(this.getStepCounter() - 20);
		}
	}
}
