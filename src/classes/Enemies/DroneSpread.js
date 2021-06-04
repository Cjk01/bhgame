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
		// shoots a circular pattern of bullets around the sprite that move away from it

		for (let i = 0; i < 9; i++) {
			let bullet = new SinewaveBullet(
				this.scene,
				this.x + 40 * i + 1,
				this.y,
				"",
				5,
				5,
				0,
				0
			).play({ key: "BlueSwirl-L", repeat: -1 });
			bullet.setCircle(bullet.width / 2);
			bullet.setVelocityY(100);
			this.scene.bullets.add(bullet);
		}
	}
}
