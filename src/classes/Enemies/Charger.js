import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";

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
}
