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
		this.load.image("enemyBullet", "../../assets/Bullet/EnemyBullet.png");
		this.load.image("enemy", "../../assets/Enemies/DakanIdle.png");
	}
	create() {
		this.add.image(250, 350, "background");
		this.player = new Player(this, 250, 600, "player1");
		this.movementSpeed = 7;
		this.enemies = this.physics.add.group();
		this.enemies.add(new Enemy(this, 300, 200, "enemy"));

		this.bullets = this.physics.add.group();
		this.bullets.add(new Bullet(this, 400, 400, "enemyBullet"));

		this.physics.add.collider(this.player, this.bullets, () => {
			console.log("collision occured");
		});
		this.physics.add.collider(this.player, this.enemies, () => {
			console.log("collision occured");
		});

		this.anims.create({
			key: "left",
			frames: [
				{ key: "playerLeft1", frame: null },
				{ key: "playerLeft2", frame: null },
			],
			frameRate: 8,
			repeat: -1,
		});

		this.anims.create({
			key: "right",
			frames: [
				{ key: "playerRight1", frame: null },
				{ key: "playerRight2", frame: null },
			],
			frameRate: 8,
			repeat: -1,
		});
		this.anims.create({
			key: "explode",
			frames: [
				{ key: "playerExplosion1", frame: null },
				{ key: "playerExplosion2", frame: null },
				{ key: "plaerExplosion3", frame: null },
			],
			frameRate: 10,
			repeat: 1,
		});
	}
	update() {
		// refill enemy q

		let cursors = this.input.keyboard.createCursorKeys();
		if (cursors.space.isDown) {
			// fire bullet from the player;
		}

		if (cursors.left.isDown) {
			this.player.x -= this.movementSpeed;
		} else if (cursors.right.isDown) {
			this.player.x += this.movementSpeed;
		} else {
		}
		if (cursors.up.isDown) {
			this.player.y -= this.movementSpeed;
		} else if (cursors.down.isDown) {
			this.player.y += this.movementSpeed;
		}
	}
}
