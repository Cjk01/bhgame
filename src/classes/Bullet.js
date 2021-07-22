export default class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, velX, velY) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setImmovable(true);
		this.setVelocityX(velX);
		this.setVelocityY(velY);
		this.stepCounter = 0;
		this.stepLimit = 0;
	}

	update() {
		this.setCircle(this.displayWidth / 2);
	}
	destroyIfOutOfBounds() {
		if (
			this.x > this.scene.game.canvas.width ||
			this.x < 0 ||
			this.y > this.scene.game.canvas.height ||
			this.y < 0
		) {
			this.destroy();
		}
	}
	getStepCount() {
		return this.stepCounter;
	}
	getStepLimit() {
		return this.stepLimit;
	}
	setStepCount(steps) {
		this.stepCounter = steps;
	}
	setStepLimit(steps) {
		this.stepLimit = steps;
	}
	incrementStepCount() {
		this.setStepCount(this.getStepCount() + 1);
	}
}
