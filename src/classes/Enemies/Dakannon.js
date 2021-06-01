import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
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
			for (let i = 0; i < 4; i++) {
				this.shoot();
			}
			this.setFrameCounter(0);
		}
	}
	shoot() {
		let b1 = new Bullet(
			this.scene,
			this.x,
			this.y + this.height,
			"enemyBullet",
			0,
			300
		).play({ key: "PinkSwirl", repeat: -1 });
		let b2 = new Bullet(
			this.scene,
			this.x - this.width / 2,
			this.y + this.height,
			"enemyBullet",
			-200,
			300
		).play({ key: "PinkSwirl", repeat: -1 });
		let b3 = new Bullet(
			this.scene,
			this.x + this.width / 2,
			this.y + this.height,
			"enemyBullet",
			200,
			300
		).play({ key: "PinkSwirl", repeat: -1 });
		this.scene.bullets.add(b1);
		this.scene.bullets.add(b2);
		this.scene.bullets.add(b3);
	}
}
