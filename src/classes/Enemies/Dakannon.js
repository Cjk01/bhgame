import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
import TrackingBullet from "../Bullets/TrackingBullet.js";
export default class Dakannon extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		console.log("Dakannon created");
		this.setHp(6);
		this.setValue(20);
		this.setFrameCounter(100);
	}
	move() {
		// teleporting to an x position within 20 of the player
		if (this.getFrameCounter() >= 100) {
			this.x = this.scene.player.x + this.scene.getRandomInt(-70, 71);

			if (this.scene.player.y - this.y > 100) {
				this.y += 50;
			} else {
				this.y -= 300;
			}

			this.shoot();

			this.setFrameCounter(0);
		}
	}
	shoot() {
		let xIncrement = 20;
		let xPos = 0;
		let negFlag = 1;
		for (let i = 0; i < 7; i++) {
			let b1 = new TrackingBullet(
				this.scene,
				this.x + xPos * negFlag,
				this.y + 20,
				"",
				this.scene.player
			).play({ key: "PinkSwirl", repeat: -1 });
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
