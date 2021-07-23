import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
import TrackingBullet from "../Bullets/TrackingBullet.js";

export default class Charger extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setHp(8);
		this.setValue(30);
		this.setStepCounter(200);
		this.setStepLimit(200);
		this.setMovementSpeed(120);

		this.play({
			key: "ChargerIdle",
			repeat: -1,
		});
	}

	shoot() {
		for (let i = 0; i < 3; i++) {
			this.scene.bullets.add(
				new TrackingBullet(
					this.scene,
					this.x + 90 * Math.pow(-1, i + 1),
					this.y + this.displayHeight / 2,
					"",
					this.scene.player
				).play({ key: "BlueSpiral-L", repeat: -1 })
			);
		}
		this.setStepCounter(0);
	}
}
