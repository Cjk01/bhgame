import Enemy from "../Enemy.js";
import Bullet from "../Bullet.js";
export default class TrackingBullet extends Bullet {
	constructor(scene, x, y, texture, target) {
		super(scene, x, y, texture, 0, 0);

		this.target = target;
		this.tracking = true;
		this.distanceFromTarget = Phaser.Math.Distance.Between(
			this.x,
			this.y,
			this.target.x,
			this.target.y
		);

		/*
        In milliseconds , how long the tracking bullet should 
        take to reach the target. Default is 5000 ms === 5 seconds
        */
		this.maxTime = 1000;
	}
	update() {
		if (
			Phaser.Math.Distance.Between(
				this.x,
				this.y,
				this.target.x,
				this.target.y
			) >= 100 &&
			this.isTracking()
		) {
			this.setAngle(
				this.scene.physics.moveToObject(this, this.target, null, this.maxTime) *
					(180 / Math.PI)
			);
		} else {
			this.setTracking(false);
		}
	}
	getMaxTime() {
		return this.maxTime;
	}
	setMaxTime(time) {
		this.maxTime = time;
	}
	getTarget() {
		return this.target;
	}
	setTarget(target) {
		this.target = target;
	}
	isTracking() {
		return this.tracking;
	}
	setTracking(bool) {
		this.tracking = bool;
	}
}
