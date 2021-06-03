import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
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
		if (this.getStepCounter() >= this.getStepLimit()) {
			this.shoot();
			this.setStepCounter(0);
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
			).play({ key: "BlueSwirl-L", repeat: -1 });
			bullet.setCircle(bullet.width / 2);
			this.scene.bullets.add(bullet);
			xCount += 45;
		}
	}
}
