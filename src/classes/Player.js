import Bullet from "./Bullet.js";
export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.body.setBoundsRectangle(
			new Phaser.Geom.Rectangle(
				20,
				20,
				this.scene.sys.canvas.width - 40,
				this.scene.sys.canvas.height - 40
			)
		);
		this.setImmovable(true);

		this.setSize(1, 1);
		this.scene = scene;
		this.lives = 3;
		this.movementSpeed = 5;
		this.stepsSinceLastShot = 15;
		this.score = 0;
		this.bombs = 1000;
		this.invulnerable = false;
		this.on("animationcomplete", () => {
			//resetting the player position when the player dies
			this.setInvulnerable(true);
			this.play({ key: "PlayerShipIdle", repeat: -1 });
		});
		this.play({ key: "PlayerShipIdle", repeat: -1 });
		console.log("player object created");
	}
	gotHit() {
		if (!this.isInvulnerable()) {
			this.setStepsSinceLastShot(-45);
			this.scene.playerHitCollider.active = false;

			this.setLives(this.getLives() - 1);

			if (this.getLives() <= 0) {
				console.log("game over");
				this.scene.scene.stop();
			}
			this.play({ key: "PlayerShipExplosion" });
			this.scene.cameras.main.shake(250, 0.03, false);
		}
	}
	shoot() {
		this.setInvulnerable(false);

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

			this.scene.cameras.main.flash(500, 255, 90, 0, false);
			this.scene.cameras.main.shake(200, 0.08, false);

			this.scene.bullets.clear(true, true);
			this.scene.enemies.clear(true, true);
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
	isInvulnerable() {
		return this.invulnerable;
	}
	setInvulnerable(bool) {
		this.invulnerable = bool;
		if (this.invulnerable) {
			this.scene.playerHitCollider.active = false;
			this.alpha = 0.5;
			this.x = this.scene.sys.canvas.width / 2;
			this.y = this.scene.sys.canvas.height - 100;
		} else {
			this.scene.playerHitCollider.active = true;
			this.alpha = 1.0;
		}
	}
}
