import Phaser from "../lib/phaser.js";
import Player from "../classes/Player.js";
import Enemy from "../classes/Enemy.js";
import Bullet from "../classes/Bullet.js";

export default class Game extends Phaser.Scene {
	constructor() {
		super("game");
	}
	preload() {
		this.load.image("background", "../../assets/Background/BackgroundMoon.png");
		this.load.image(
			"player1",
			"../../assets/playerSprites/PlayerShipIdle1.png"
		);
		this.load.image(
			"player2",
			"../../assets/playerSprites/PlayerShipIdle2.png"
		);
		this.load.image(
			"playerLeft1",
			"../../assets/playerSprites/PlayerShipLeftTilt1.png"
		);
		this.load.image(
			"playerLeft2",
			"../../assets/playerSprites/PlayerShipLeftTilt2.png"
		);
		this.load.image(
			"playerRight1",
			"../../assets/playerSprites/PlayerShipRightTilt1.png"
		);
		this.load.image(
			"playerRight2",
			"../../assets/playerSprites/PlayerShipRightTilt2.png"
		);
		this.load.image(
			"playerBullet",
			"../../assets/playerSprites/PlayerBullet.png"
		);
		this.load.image(
			"playerExplosion1",
			"../../assets/playerSprites/PlayerShipExplosion2.png"
		);
		this.load.image(
			"playerExplosion2",
			"../../assets/playerSprites/PlayerShipExplosion3.png"
		);
		this.load.image(
			"playerExplosion3",
			"../../assets/playerSprites/PlayerShipExplosion4.png"
		);
		this.load.image(
			"playerLaser",
			"../../assets/playerSprites/PlayerShipLaser.png"
		);
		this.load.image("enemyBullet", "../../assets/Bullet/EnemyBullet.png");
		this.load.image("enemy", "../../assets/Enemies/DroneSpreadIdle1.png");
		this.load.path = "../../assets/SpriteSheets/";
		this.load.aseprite(
			"playerSprites",
			"PlayerShipSheet.png",
			"PlayerShipSheet.json"
		);
	}
	create() {
		this.rotation = 0;
		this.anims.createFromAseprite("playerSprites");
		this.add.image(250, 350, "background");
		this.player = new Player(this, 250, 600, "player1");

		this.playerBullets = this.physics.add.group();
		this.playerBullets.defaults = {};

		this.enemies = this.physics.add.group();
		this.enemies.defaults = {};

		this.bullets = this.physics.add.group();
		this.bullets.defaults = {};
		this.framesSinceLastBullet = 20;

		this.getRandomInt = (min, max) => {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
		};

		function handleEnemyHit(bullet, enemy) {
			bullet.destroy();
			enemy.gotHit();
			console.log("player score: " + this.player.getScore());
		}
		function handlePlayerHit(player, bullet) {
			bullet.destroy();
			player.gotHit();
			console.log("player now has " + this.player.getLives() + " lives");
		}
		this.physics.add.collider(
			this.player,
			this.bullets,
			handlePlayerHit,
			null,
			this
		);

		this.physics.add.collider(
			this.playerBullets,
			this.enemies,
			handleEnemyHit,
			null,
			this
		);
	}
	update() {
		let cursors = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			space: Phaser.Input.Keyboard.KeyCodes.SPACE,
		});
		if (this.enemies.getLength() <= 3) {
			let randX = this.getRandomInt(0, 500);
			let randY = this.getRandomInt(0, 200);
			let enemy = new Enemy(this, randX, randY, "enemy");

			this.enemies.add(enemy);
		}
		if (this.framesSinceLastBullet >= 20) {
			for (let i = 0; i < this.enemies.getLength(); i++) {
				let bullet = new Bullet(
					this,
					this.enemies.getChildren()[i].x,
					this.enemies.getChildren()[i].y + 20,
					"enemyBullet",
					this.getRandomInt(-360, 360),
					this.getRandomInt(-200, 200)
				);
				if (this.enemies.getChildren()[i].x >= this.player.x) {
					this.enemies.getChildren()[i].x -= this.getRandomInt(10, 31);
				} else {
					this.enemies.getChildren()[i].x += this.getRandomInt(10, 31);
				}
				if (this.player.y - this.enemies.getChildren()[i].y >= 200) {
					this.enemies.getChildren()[i].y += this.getRandomInt(20, 41);
				} else {
					this.enemies.getChildren()[i].y -= this.getRandomInt(20, 41);
				}

				this.bullets.add(bullet);
			}

			this.framesSinceLastBullet = 0;
		} else {
			this.framesSinceLastBullet++;
		}
		let moving = false;
		if (cursors.left.isDown) {
			if (this.player.anims.isPlaying) {
				this.player.play("ShipLeftTilt", true);
			}
			console.log(this.player.anims.currentFrame.isLast);
			if (this.player.anims.currentFrame.isLast) {
				this.player.anims.pause();
			}
			this.player.x -= this.player.getMovementSpeed();
			moving = true;
		}
		if (cursors.right.isDown && !cursors.left.isDown) {
			if (this.player.anims.isPlaying) {
				this.player.play("ShipRightTilt", true);
			}
			console.log(this.player.anims.currentFrame.isLast);
			if (this.player.anims.currentFrame.isLast) {
				this.player.anims.pause();
			}
			this.player.x += this.player.getMovementSpeed();
			moving = true;
		}
		if (cursors.up.isDown) {
			this.player.play("ShipIdle", true);
			this.player.y -= this.player.getMovementSpeed();
			moving = true;
		}
		if (cursors.down.isDown && !cursors.up.isDown) {
			this.player.play("ShipIdle", true);
			this.player.y += this.player.getMovementSpeed();
			moving = true;
		}
		if (!moving) {
			this.player.play("ShipIdle", true);
		}

		if (cursors.space.isDown && this.player.getFramesSinceLastShot() >= 15) {
			console.log("firing bullet");
			this.player.shoot();
		} else {
			this.player.setFramesSinceLastShot(
				this.player.getFramesSinceLastShot() + 1
			);
		}
	}
}
