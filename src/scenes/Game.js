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
		this.load.image("enemy", "../../assets/Enemies/DakanIdle.png");
		this.load.path = "../../assets/SpriteSheets/";
		this.load.aseprite(
			"playerSprites",
			"PlayerShipSpriteSheet.png",
			"PlayerShipSheet.json"
		);
	}
	create() {
		this.add.image(250, 350, "background");
		this.player = new Player(this, 250, 600, "player1");
		this.movementSpeed = 7;
		this.playerBullets = this.physics.add.group();
		this.playerBullets.defaults = {};

		this.enemies = this.physics.add.group();
		this.enemies.defaults = {};

		this.bullets = this.physics.add.group();
		this.bullets.defaults = {};
		this.framesSinceLastBullet = 20;
		this.framesSinceLastPlayerBullet = 15;
		function handleEnemyHit(bullet, enemy) {
			bullet.destroy();
			enemy.gotHit();
			if (enemy.getHp() <= 0) {
				enemy.destroy();
				this.player.setScore(this.player.getScore() + enemy.getValue());
			}
			console.log("player score: " + this.player.getScore());
		}
		function handlePlayerHit(player, bullet) {
			player.gotHit();
			if (player.getLives() <= 0) {
				console.log("game over");
			}
			bullet.destroy();
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
		this.anims.createFromAseprite("playerSprites");
		// idle1 , idle2, left1 , left2 , left3 , right1 , right2, right3
	}
	update() {
		this.player.play("0");
		// refill enemy q
		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
		}

		let cursors = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			space: Phaser.Input.Keyboard.KeyCodes.SPACE,
		});
		if (this.enemies.getLength() <= 3) {
			let randX = getRandomInt(0, 500);
			let randY = getRandomInt(0, 200);
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
					getRandomInt(-500, 500),
					getRandomInt(50, 200)
				);

				this.bullets.add(bullet);
			}
			this.framesSinceLastBullet = 0;
		} else {
			this.framesSinceLastBullet++;
		}

		if (cursors.left.isDown) {
			this.player.x -= this.movementSpeed;
		}
		if (cursors.right.isDown && !cursors.left.isDown) {
			this.player.x += this.movementSpeed;
		}
		if (cursors.up.isDown) {
			this.player.y -= this.movementSpeed;
		}
		if (cursors.down.isDown && !cursors.up.isDown) {
			this.player.y += this.movementSpeed;
		}

		if (cursors.space.isDown && this.framesSinceLastPlayerBullet >= 15) {
			// fire bullet from the player;
			console.log("firing bullet");
			let playerShotLeft = new Bullet(
				this,
				this.player.x + 8,
				this.player.y - 32,
				"playerLaser",
				0,
				-600
			);
			let playerShotRight = new Bullet(
				this,
				this.player.x - 8,
				this.player.y - 32,
				"playerLaser",
				0,
				-600
			);

			this.playerBullets.add(playerShotLeft);
			this.playerBullets.add(playerShotRight);
			this.framesSinceLastPlayerBullet = 0;
		} else {
			this.framesSinceLastPlayerBullet++;
		}
	}
}
