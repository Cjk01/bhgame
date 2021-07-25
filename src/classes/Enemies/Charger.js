import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
import TrackingBullet from "../Bullets/TrackingBullet.js";
import SinewaveBullet from "../Bullets/SinewaveBullet.js";

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
		for (let i = 0; i < 9; i++) {
			this.scene.bullets.add(
				new SinewaveBullet(
					this.scene,
					this.x,
					this.y + 20,
					"",
					0,
					0,
					30,
					0
				).play({ key: "PurpleBall", repeat: -1 })
			);
		}
		this.setStepCounter(0);
	}
}
