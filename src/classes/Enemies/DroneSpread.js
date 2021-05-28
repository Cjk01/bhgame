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
		this.down = false;
	}
	move() {
		if (this.getFrameCounter() >= 40) {
			// movement logic here :
			if (this.y >= 680) {
				this.scene.physics.accelerateTo(this, this.x, 20, 50, 40, 300);
			} else {
				this.scene.physics.accelerateTo(this, this.x, 680, 50, 40, 300);
			}
			this.shoot();
			this.setFrameCounter(0);
		}
	}
	shoot() {
		let xCount = 0;
		let yCount = 200;
		for (let i = 0; i < 6; i++) {
			let bullet = new Bullet(
				this.scene,
				this.x,
				this.y,
				"enemyBullet",
				xCount,
				yCount
			);
			this.scene.bullets.add(bullet);
			xCount += 45;
			yCount -= 90;
		}
	}
}
