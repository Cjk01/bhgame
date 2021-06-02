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
		this.scene.physics.accelerateTo(this, this.x, 680, 250, 40, 400);
	}
	move() {
		if (this.getFrameCounter() >= 120) {
			if (this.y >= 680 && this.down) {
				this.scene.physics.accelerateTo(this, 100, 100, this.y - 50, 70, 400);
				this.down = false;
			} else if (this.down === false && this.y <= 30) {
				this.scene.physics.accelerateTo(this, 600, this.y + 50, 50, 70, 400);
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
				"",
				vec2.x,
				vec2.y
			).play({ key: "BlueSpin", repeat: -1 });
			this.scene.bullets.add(bullet);
			xCount += 45;
		}
	}
}
