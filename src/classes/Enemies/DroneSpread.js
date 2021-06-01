import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
export default class DroneSpread extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		console.log("Dakannon created");
		this.setHp(5);
		this.setValue(30);
		this.setFrameCounter(120);
		this.setMovementSpeed(3);
		this.down = true;
		this.scene.physics.accelerateTo(this, this.x, 680, 50, 40, 300);
	}
	move() {
		if (this.getFrameCounter() >= 120) {
			// movement logic here :
			if (this.y >= 680 && this.down) {
				this.scene.physics.accelerateTo(this, this.x - 100, 20, 50, 40, 300);
				this.down = false;
			} else if (this.down === false && this.y <= 30) {
				this.scene.physics.accelerateTo(this, this.x + 100, 680, 50, 40, 300);
				this.down = true;
			}
			this.shoot();
			this.setFrameCounter(0);
		}
	}
	shoot() {
		let xCount = 0;
		let yCount = 200;
		for (let i = 0; i < 9; i++) {
			let vec2 = this.scene.physics.velocityFromAngle(xCount, yCount);
			let bullet = new Bullet(
				this.scene,
				this.x,
				this.y,
				"enemyBullet",
				vec2.x,
				vec2.y
			).play({ key: "GreenCircle", repeat: -1 });
			this.scene.bullets.add(bullet);
			xCount += 45;
		}
	}
}
