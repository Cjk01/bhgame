import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
import SinewaveBullet from "../Bullets/SinewaveBullet.js";
export default class DroneSpread extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setHp(5);
		this.setValue(30);
		this.setStepCounter(240);
		this.setStepLimit(240);
		this.setMovementSpeed(3);
	}
	move() {
		// pattern: move towards the player's position and shoot
		if (this.getStepCounter() >= this.getStepLimit()) {
			this.scene.physics.moveTo(
				this,
				this.scene.player.x,
				this.scene.player.y,
				120,
				3000
			);
			this.shoot();
			this.setStepCounter(0);
		}
	}
	shoot() {
		this.shootAtAngle(0, 40, 9, "RedBall", 50, 0, 0);
	}
}
