import Bullet from "./Bullet.js";
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.setImmovable(true);
		this.movementSpeed = 1;
		this.hp = 1;
		this.value = 1;
		this.stepCounter = 0;
		this.stepLimit = 0;

		console.log("enemy object created");
	}

	gotHit() {
		console.log("enemy: " + this + "was hit");
		// to be replaced with a tween
		this.tint = 0xff0000;
		this.setHp(this.getHp() - 1);
		if (this.getHp() <= 0) {
			this.scene.player.setScore(
				this.scene.player.getScore() + this.getValue()
			);
			this.scene.score.setText("Score: " + this.scene.player.getScore());

			this.destroy();
		}
	}
	move() {
		// to be overriden by the extending class
	}
	shoot() {
		// to be overriden by the extending class
	}
	shootAtAngle(angle, amount, increment, textureName, speed, shiftX, shiftY) {
		let ang = angle;
		let amt = amount | 1;
		let inc = increment | 0;
		let sX = shiftX | 0;
		let sY = shiftY | 0;
		for (let i = 0; i < amt; i++) {
			let vec = this.scene.physics.velocityFromAngle(ang, speed);
			let bullet = new Bullet(
				this.scene,
				this.x + sX,
				this.y + sY,
				"",
				vec.x,
				vec.y
			).play({ key: textureName, repeat: -1 });
			this.scene.bullets.add(bullet);
			ang += inc;
		}
	}

	getValue() {
		return this.value;
	}
	setValue(value) {
		this.value = value;
	}
	getHp() {
		return this.hp;
	}
	setHp(hp) {
		this.hp = hp;
	}
	getMovementSpeed() {
		return this.movementSpeed;
	}
	setMovementSpeed(speed) {
		this.movementSpeed = speed;
	}
	getStepCounter() {
		return this.stepCounter;
	}
	setStepCounter(steps) {
		this.stepCounter = steps;
	}
	incrementSteps() {
		this.stepCounter = this.stepCounter + 1;
	}
	getStepLimit() {
		return this.stepLimit;
	}
	setStepLimit(limit) {
		this.stepLimit = limit;
	}
}
