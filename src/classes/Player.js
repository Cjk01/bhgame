import Bullet from "./Bullet.js";
export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.setImmovable(true);
		this.setSize(1, 1);
		this.scene = scene;
		this.lives = 3;
		this.movementSpeed = 5;
		this.framesSinceLastShot = 15;
		this.score = 0;
		this.bombs = 2;
		console.log("player object created");
	}
	gotHit() {
		this.setLives(this.getLives() - 1);
		if (this.getLives() <= 0) {
			console.log("game over");
		}
	}
	shoot() {
		let playerShotLeft = new Bullet(
			this.scene,
			this.x + 8,
			this.y,
			"playerLaser",
			0,
			-600
		);
		let playerShotRight = new Bullet(
			this.scene,
			this.x - 8,
			this.y,
			"playerLaser",
			0,
			-600
		);
		this.scene.playerBullets.add(playerShotLeft);
		this.scene.playerBullets.add(playerShotRight);
		this.setFramesSinceLastShot(0);
	}
	getLives() {
		return this.lives;
	}
	setLives(lives) {
		this.lives = lives;
	}
	getScore() {
		return this.score;
	}
	setScore(score) {
		this.score = score;
	}

	getBombs() {
		return this.bombs;
	}
	setBombs(bombs) {
		this.bombs = bombs;
	}
	getMovementSpeed() {
		return this.movementSpeed;
	}
	setMovementSpeed(speed) {
		this.movementSpeed = speed;
	}
	getFramesSinceLastShot() {
		return this.framesSinceLastShot;
	}
	setFramesSinceLastShot(frames) {
		this.framesSinceLastShot = frames;
	}
}
