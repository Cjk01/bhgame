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
		this.setMovementSpeed(3);
		this.play({ key: "DroneSpeadIdle", repeat: -1 });
		this.on("animationcomplete", () => {
			this.play({ key: "DroneSpeadIdle", repeat: -1 });
		});
	}
}
