import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
import TrackingBullet from "../Bullets/TrackingBullet.js";
export default class Dakannon extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);

		this.setHp(6);
		this.setValue(20);
		this.setStepCounter(0);
		this.setStepLimit(360);
		this.setVelocityY(100);
	}
	move() {
		// the enemy moves forward in a sinewave pattern
		if (this.getStepCounter() >= this.getStepLimit()) {
			this.shoot();
			this.setVelocityY(-100);
			this.setStepCounter(0);
		}
		this.x += Math.sin(this.getStepCounter() * (Math.PI / 180));
	}
	shoot() {
		let xIncrement = 50;
		let xPos = 0;
		let negFlag = 1;
		for (let i = 0; i < 7; i++) {
			let b1 = new TrackingBullet(
				this.scene,
				this.x + xPos * negFlag,
				this.y + 20,
				"",
				this.scene.player
			).play({ key: "RedSpiral-L", repeat: -1 });
			b1.setCircle(b1.width / 2);
			this.scene.bullets.add(b1);
			xPos += xIncrement;
			if (negFlag) {
				negFlag = -1;
			} else {
				negFlag = 1;
			}
		}
	}
}
