import Phaser from "../lib/phaser.js";
import Player from "../classes/Player.js";
import Enemy from "../classes/Enemy.js";
import Bullet from "../classes/Bullet.js";
import Dakannon from "../classes/Enemies/Dakannon.js";
import DroneSpread from "../classes/Enemies/DroneSpread.js";
import Charger from "../classes/Enemies/Charger.js";
import Eyeball from "../classes/Enemies/Eyeball.js";
import LinkedList from "../lib/LinkedList.js";

export default class Game extends Phaser.Scene {
	constructor() {
		super("game");
	}
	preload() {
		this.load.image("background", "../../assets/Background/BackgroundMoon.png");

		this.load.path = "../../assets/SpriteSheets/";
		this.load.aseprite(
			"playerSprites",
			"PlayerShipSheet.png",
			"PlayerShipSheet.json"
		);

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
			"EnemiesSpriteSheet/Dakan.png",
			"EnemiesSpriteSheet/Dakan.json"
		);
		this.load.aseprite(
			"Eyeball",
			"EnemiesSpriteSheet/Eyeball.png",
			"EnemiesSpriteSheet/Eyeball.json"
		);
		this.load.aseprite(
			"DroneSpread",
			"EnemiesSpriteSheet/DroneSpread.png",
			"EnemiesSpriteSheet/DroneSpread.json"
		);
		this.load.aseprite(
			"Turtle",
			"EnemiesSpriteSheet/turtle.png",
			"EnemiesSpriteSheet/turtle.json"
		);
		this.load.aseprite(
			"Charger",
			"EnemiesSpriteSheet/Charger.png",
			"EnemiesSpriteSheet/Charger.json"
		);
		this.load.aseprite("PlayerLaser", "PlayerLaser.png", "PlayerLaser.json");
	}
	create() {
		this.anims.createFromAseprite("playerSprites");
		this.anims.createFromAseprite("BlastBullets");
		this.anims.createFromAseprite("SpiralBullets");
		this.anims.createFromAseprite("SwirlBullets");
		this.anims.createFromAseprite("BallBullets");
		this.anims.createFromAseprite("Dakannon");
		this.anims.createFromAseprite("Eyeball");
		this.anims.createFromAseprite("DroneSpread");
		this.anims.createFromAseprite("Turtle");
		this.anims.createFromAseprite("Charger");
		this.anims.createFromAseprite("PlayerLaser");

		this.add.image(250, 350, "background");
		this.player = new Player(this, 250, 600, "");
		this.score = this.add.text(0, 0, "Score: 0", { font: "Arial" });

		this.enemyList = {
			Dakannon: new Dakannon(this, -300, -300, "")
				.setActive(false)
				.setVisible(false),
			DroneSpread: new DroneSpread(this, -300, -300, "")
				.setActive(false)
				.setVisible(false),
			Charger: new Charger(this, -300, -300, "")
				.setActive(false)
				.setVisible(false),
			Eyeball: new Eyeball(this, -300, -300, "")
				.setActive(false)
				.setVisible(false),
		};
		this.getRandomInt = (min, max) => {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min) + min);
		};
		/**
		 * returns a non active randomly selected enemy
		 */
		this.generateRandomEnemy = (list) => {
			let names = Object.keys(list);
			let index = this.getRandomInt(0, names.length);
			let enemyName = names[index];
			let enemyObj = list[enemyName];
			let newEnemy = enemyObj.clone();
			return newEnemy;
		};
		this.playerBullets = this.physics.add.group();
		this.playerBullets.defaults = {};

		this.enemies = this.physics.add.group();
		this.enemies.defaults = {};

		this.bullets = this.physics.add.group();
		this.bullets.defaults = {};

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
			bomb: Phaser.Input.Keyboard.KeyCodes.B,
		});
		while (this.enemies.getLength() <= 3) {
			let enemy = this.generateRandomEnemy(this.enemyList);
			let xpos = this.getRandomInt(20, this.sys.canvas.width - 20 + 1);
			let ypos = this.getRandomInt(20, this.sys.canvas.height - 300);
			enemy.x = xpos;
			enemy.y = ypos;
			enemy.setCurrentDestination(xpos, ypos);
			if (this.enemies.getLength() > 1) {
				enemy.setFollowing(true);
				enemy.setFollowTarget(this.enemies.getChildren()[0]);
				enemy.x = enemy.getFollowTarget().x;
				enemy.y = enemy.getFollowTarget().y - 40;
			}
			enemy.setActive(true);

			this.enemies.add(enemy);
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
		if (Phaser.Input.Keyboard.JustDown(cursors.bomb)) {
			this.player.useBomb();
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
