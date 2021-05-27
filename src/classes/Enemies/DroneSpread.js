import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
export default class DroneSpread extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		console.log("Dakannon created");
		this.setHp(8);
		this.setValue(30);
		this.setFrameCounter(40);
		this.setMovementSpeed(3);
	}
	move() {
		if (this.getFrameCounter() >= 40) {
			// movement logic here :
		}
	}
	shoot() {}
}
