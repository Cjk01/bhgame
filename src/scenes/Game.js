import Phaser from "../lib/phaser.js";
import Player from "../classes/Player.js";
import Enemy from "../classes/Enemy.js";
import Bullet from "../classes/Bullet.js";
import Dakannon from "../classes/Enemies/Dakannon.js";
import DroneSpread from "../classes/Enemies/DroneSpread.js";

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

		this.load.image("DroneSpread", "../../assets/Enemies/DroneSpreadIdle1.png");
		this.load.path = "../../assets/SpriteSheets/";
		this.load.aseprite(
			"playerSprites",
			"PlayerShipSheet.png",
			"PlayerShipSheet.json"
		);
		this.load.aseprite("BallBullets", "BallBullet-S.png", "BallBullet-S.json");
		this.load.aseprite(
			"BlastBullets",
			"BlastBullet-M.png",
			"BlastBullet-M.json "
		);
		this.load.aseprite(
			"SpiralBullets",
			"SpiralBullet-L.png",
			"SpiralBullet-L.json "
		);
		this.load.aseprite(
			"SwirlBullets",
			"SwirlBullet-L.png",
			"SwirlBullet-L.json "
		);
		this.load.aseprite("BallBullets", "BallBullet-S.png", "BallBullet-S.json ");
		this.load.aseprite(
			"Dakannon",
			"EnemiesSpriteSheet/Dakannon.png",
			"EnemiesSpriteSheet/Dakannon.json"
		);
	}
	create() {
		this.anims.createFromAseprite("playerSprites");
		this.anims.createFromAseprite("BlastBullets");
		this.anims.createFromAseprite("SpiralBullets");
		this.anims.createFromAseprite("SwirlBullets");
		this.anims.createFromAseprite("BallBullets");
		this.anims.createFromAseprite("Dakannon");
		this.add.image(250, 350, "background");
		this.player = new Player(this, 250, 600, "").play({
			key: "PlayerShipIdle",
			repeat: -1,
		});
		this.score = this.add.text(0, 0, "Score: 0", { font: "Arial" });

		this.enemyBucket = ["Dakannon", "DroneSpread"];
		this.playerBullets = this.physics.add.group();
		this.playerBullets.defaults = {};

		this.enemies = this.physics.add.group();
		this.enemies.defaults = {};

		this.bullets = this.physics.add.group();
		this.bullets.defaults = {};

		this.getRandomInt = (min, max) => {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min) + min);
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
		if (this.enemies.getLength() <= 2) {
			let bucketInt = this.getRandomInt(0, 2);
			let enemyToGrab = this.enemyBucket[bucketInt];
			let randX = this.getRandomInt(0, 501);
			let randY = this.getRandomInt(0, 201);
			if (enemyToGrab == "Dakannon") {
				let enemy = new Dakannon(this, randX, randY, "").play({
					key: "DakanIdle",
					repeat: -1,
				});

				this.enemies.add(enemy);
			} else {
				let enemy = new DroneSpread(this, randX, randY, "DroneSpread");

				this.enemies.add(enemy);
			}
		}

		if (cursors.left.isDown) {
			this.player.x -= this.player.getMovementSpeed();
		}
		if (cursors.right.isDown && !cursors.left.isDown) {
			this.player.x += this.player.getMovementSpeed();
		}
		if (cursors.up.isDown) {
			this.player.y -= this.player.getMovementSpeed();
		}
		if (cursors.down.isDown && !cursors.up.isDown) {
			this.player.y += this.player.getMovementSpeed();
		}

		if (cursors.space.isDown && this.player.getStepsSinceLastShot() >= 15) {
			console.log("firing bullet");
			this.player.shoot();
		} else {
			this.player.setStepsSinceLastShot(
				this.player.getStepsSinceLastShot() + 1
			);
		}
		for (let i = 0; i < this.enemies.getLength(); i++) {
			this.enemies.getChildren()[i].move();
			this.enemies.getChildren()[i].incrementSteps();
		}
		for (let i = 0; i < this.bullets.getLength(); i++) {
			this.bullets.getChildren()[i].update();
			this.bullets.getChildren()[i].incrementStepCount();
			this.bullets.getChildren()[i].destroyIfOutOfBounds();
		}
	}
}
