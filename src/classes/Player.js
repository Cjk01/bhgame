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
		this.stepsSinceLastShot = 15;
		this.score = 0;
		this.bombs = 10;
		this.on("animationcomplete", () => {
			this.play({ key: "PlayerShipIdle", repeat: -1 });
		});
		this.play({ key: "PlayerShipIdle", repeat: -1 });
		console.log("player object created");
	}
	gotHit() {
		this.play({ key: "PlayerShipExplosion" });

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
			"",
			0,
			-600
		).play({ key: "PlayerShoot", repeat: -1 });
		let playerShotRight = new Bullet(
			this.scene,
			this.x - 8,
			this.y,
			"",
			0,
			-600
		).play({ key: "PlayerShoot", repeat: -1 });

		this.scene.playerBullets.add(playerShotLeft);
		this.scene.playerBullets.add(playerShotRight);
		this.setStepsSinceLastShot(0);
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
	useBomb() {
		//clears all enemies on the screen and depletes the available bombs by 1
		if (this.getBombs() > 0) {
			console.log("bomb trigger");
			this.scene.enemies.clear(true, true);
			this.scene.bullets.clear(true, true);
			this.setBombs(this.getBombs() - 1);
		}

		console.log(this.getBombs());
	}
	getMovementSpeed() {
		return this.movementSpeed;
	}
	setMovementSpeed(speed) {
		this.movementSpeed = speed;
	}
	getStepsSinceLastShot() {
		return this.stepsSinceLastShot;
	}
	setStepsSinceLastShot(steps) {
		this.stepsSinceLastShot = steps;
	}
}
