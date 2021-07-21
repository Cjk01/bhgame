import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
import TrackingBullet from "../Bullets/TrackingBullet.js";

export default class Charger extends Enemy {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		this.setHp(8);
		this.setValue(30);
		this.setStepCounter(180);
		this.setStepLimit(180);

		this.play({
			key: "ChargerIdle",
			repeat: -1,
		});
	}

	shoot() {
		this.scene.bullets.add(
			new TrackingBullet(
				this.scene,
				this.x,
				this.y + this.displayHeight / 2,
				"",
				this.scene.player
			).play({ key: "GreenSpiral-L", repeat: -1 })
		);
	}
}
