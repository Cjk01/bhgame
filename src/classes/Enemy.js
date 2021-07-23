import Bullet from "./Bullet.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setImmovable(true);
		this.setCollideWorldBounds(false);
		this.movementSpeed = 1;
		this.hp = 1;
		this.value = 1;
		this.stepCounter = 0;
		this.stepLimit = 1000;
		this.curentDestination = [this.x, this.y];
		this.bulletPatterns = [[0, 6, 50, "RedSwirl-L", 150, 0, 20]];
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
		console.log("at x: " + this.x + "y: " + this.y);
		console.log(
			"moving to: " +
				this.getCurrentDestination()[0] +
				" " +
				this.getCurrentDestination()[1]
		);
		if (
			Phaser.Math.Distance.Between(
				this.x,
				this.y,
				this.getCurrentDestination()[0],
				this.getCurrentDestination()[1]
			) <= this.displayWidth
		) {
			this.setVelocity(0, 0);
			this.setAcceleration(0, 0);
		}
		if (this.getStepCounter() >= this.getStepLimit()) {
			this.shoot();
		}
	}
	/**
	 * generates arguments for the shootAtAngle function by reading from an enemy's bullet patterns,
	 * and executes the function for those arguments.
	 */
	shoot() {
		let patternIndex = this.scene.getRandomInt(
			0,
			this.getBulletPatterns().length
		);
		this.shootAtAngle.apply(this, this.getBulletPatterns()[patternIndex]);
		this.setStepCounter(0);
	}

	/**
	 * returns a new instance of the method caller's class with an optional x and y position parameters
	 * otherwise defaults to the instantiating object's current x and y values
	 */
	clone(x, y) {
		return new this.constructor(
			this.scene,
			x || this.x,
			y || this.y,
			this.texture
		);
	}
	/**
	 * fires a specified bullet at an angle relative to the right hand side being 0 degrees.
	 * speed: changes the speed of the fired bullet(s) in pixels / second
	 * shiftX and shiftY: change the starting position of the bullet
	 * increment: is how many degrees the given angle value is incremented per shot fired
	 * amount: how many bullets are fired.
	 *
	 */
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
	getCurrentDestination() {
		return this.currentDestination;
	}
	setCurrentDestination(x, y) {
		this.currentDestination = [x, y];
	}
	setBulletPatterns(patterns) {
		this.bulletPatterns = patterns;
	}
	getBulletPatterns() {
		return this.bulletPatterns;
	}
	addBulletPattern(pattern) {
		this.getBulletPatterns().push(pattern);
	}
}
