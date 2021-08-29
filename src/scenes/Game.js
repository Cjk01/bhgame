import Phaser from "phaser";
import Player from "../classes/Player.js";
import Enemy from "../classes/Enemy.js";
import Bullet from "../classes/Bullet.js";
import Dakannon from "../classes/Enemies/Dakannon.js";
import DroneSpread from "../classes/Enemies/DroneSpread.js";
import Charger from "../classes/Enemies/Charger.js";
import Eyeball from "../classes/Enemies/Eyeball.js";
import fBackground from "./assets/Background/BackgroundMoon.png";
import fPlayerShipSheet from "./assets/SpriteSheets/PlayerShipSheet.png";
import fPlayerShipSheetJson from "./assets/SpriteSheets/PlayerShipSheet.json";
import fBlastBullets from "./assets/SpriteSheets/BlastBullet-M.png";
import fBlastBulletsJson from "./assets/SpriteSheets/BlastBullet-M.json";
import fSpiralBullets from "./assets/SpriteSheets/SpiralBullet-L.png";
import fSpiralBulletsJson from "./assets/SpriteSheets/SpiralBullet-L.json";
import fSwirlBullets from "./assets/SpriteSheets/SwirlBullet-L.png";
import fSwirlBulletsJson from "./assets/SpriteSheets/SwirlBullet-L.json";
import fBallBullets from "./assets/SpriteSheets/BallBullet-S.png";
import fBallBulletsJson from "./assets/SpriteSheets/BallBullet-S.json";
import fDakannon from "./assets/SpriteSheets/EnemiesSpriteSheet/Dakan.png";
import fDakannonJson from "./assets/SpriteSheets/EnemiesSpriteSheet/Dakan.json";
import fEyeball from "./assets/SpriteSheets/EnemiesSpriteSheet/Eyeball.png";
import fEyeballJson from "./assets/SpriteSheets/EnemiesSpriteSheet/Eyeball.json";
import fDroneSpread from "./assets/SpriteSheets/EnemiesSpriteSheet/DroneSpread.png";
import fDroneSpreadJson from "./assets/SpriteSheets/EnemiesSpriteSheet/DroneSpread.json";
import fCharger from "./assets/SpriteSheets/EnemiesSpriteSheet/Charger.png";
import fChargerJson from "./assets/SpriteSheets/EnemiesSpriteSheet/Charger.json";
import fPlayerLaser from "./assets/SpriteSheets/PlayerLaser.png";
import fPlayerLaserJson from "./assets/SpriteSheets/PlayerLaser.json";
export default class Game extends Phaser.Scene {
	constructor() {
		super("game");
	}
	preload() {
		this.load.image("background", fBackground);
		this.load.aseprite("playerSprites", fPlayerShipSheet, fPlayerShipSheetJson);
		this.load.aseprite("BlastBullets", fBlastBullets, fBlastBulletsJson);
		this.load.aseprite("SpiralBullets", fSpiralBullets, fSpiralBulletsJson);
		this.load.aseprite("SwirlBullets", fSwirlBullets, fSwirlBulletsJson);
		this.load.aseprite("BallBullets", fBallBullets, fBallBulletsJson);
		this.load.aseprite("Dakannon", fDakannon, fDakannonJson);
		this.load.aseprite("Eyeball", fEyeball, fEyeballJson);
		this.load.aseprite("DroneSpread", fDroneSpread, fDroneSpreadJson);
		this.load.aseprite("Charger", fCharger, fChargerJson);
		this.load.aseprite("PlayerLaser", fPlayerLaser, fPlayerLaserJson);
	}
	create() {
		//creating all the preloaded assets
		this.anims.createFromAseprite("playerSprites");
		this.anims.createFromAseprite("BlastBullets");
		this.anims.createFromAseprite("SpiralBullets");
		this.anims.createFromAseprite("SwirlBullets");
		this.anims.createFromAseprite("BallBullets");
		this.anims.createFromAseprite("Dakannon");
		this.anims.createFromAseprite("Eyeball");
		this.anims.createFromAseprite("DroneSpread");
		this.anims.createFromAseprite("Charger");
		this.anims.createFromAseprite("PlayerLaser");

		this.add.image(250, 350, "background");

		this.player = new Player(this, 250, 600, "");
		this.score = this.add.text(0, 0, "Score: 0", { font: "Arial" });
		this.level = 1;
		//adding the main camera to the scene
		this.cameras.add(
			0,
			0,
			this.sys.canvas.width,
			this.sys.canvas.height,
			true,
			"mainCamera"
		);

		// used to control particles
		this.particleEmitterManager =
			new Phaser.GameObjects.Particles.ParticleEmitterManager(
				this,
				"background"
			);

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

		this.enemyGroupSize = 3;
		this.enemyGroupAmount = 2;

		this.input.gamepad.once("connected", function (pad) {
			//   'pad' is a reference to the gamepad that was just connected
			console.log("Gamepad connected");
		});

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
		this.generateEnemyByName = (enemyName) => {
			return this.enemyList[enemyName].clone();
		};
		this.playerBullets = this.physics.add.group();
		this.playerBullets.defaults = {};

		this.enemies = this.physics.add.group();
		this.enemies.defaults = {};

		this.bullets = this.physics.add.group();
		this.bullets.defaults = {};

		this.handleEnemyHit = (bullet, enemy) => {
			bullet.setHp(bullet.getHp() - 1);
			if (bullet.getHp() <= 0) {
				bullet.destroy();
			}
			enemy.gotHit();
		};
		this.handlePlayerHit = (player, bullet) => {
			bullet.setHp(bullet.getHp() - 1);
			if (bullet.getHp() <= 0) {
				bullet.destroy();
			}
			player.gotHit();
		};
		this.playerHitCollider = this.physics.add.collider(
			this.player,
			this.bullets,
			this.handlePlayerHit,
			null,
			this
		);

		this.enemyHitCollider = this.physics.add.collider(
			this.playerBullets,
			this.enemies,
			this.handleEnemyHit,
			null,
			this
		);

		//TODO refactor this at some point... there must be a simpler way to do this.

		this.generateEnemyGroup = (scene, enemyName, groupSize, shiftX, shiftY) => {
			if (groupSize == 0) {
				return false;
			}

			let enemy = scene.generateEnemyByName(enemyName);
			let spriteWidth = enemy.width;
			let spriteHeight = enemy.height;
			let xi = scene.getRandomInt(-200, scene.sys.canvas.width);
			let yi = scene.getRandomInt(-200, -100);
			let xRange;
			let yRange;
			let xf;
			let yf;

			let movementFactorX;
			let movementFactorY;

			if (shiftX != 0) {
				xRange = (Math.abs(shiftX) + spriteWidth) * groupSize;
			} else {
				xRange = spriteWidth * groupSize;
			}
			if (shiftY != 0) {
				yRange = (Math.abs(shiftY) + spriteHeight) * groupSize;
			} else {
				yRange = spriteHeight * groupSize;
			}
			if (
				xRange > scene.sys.canvas.width + spriteWidth ||
				yRange > scene.sys.canvas.height + spriteHeight / 2
			) {
				return this.generateEnemyGroup(
					scene,
					enemyName,
					groupSize - 1,
					shiftX,
					shiftY
				);
			}
			if (shiftX >= 0) {
				xf = scene.getRandomInt(0, scene.sys.canvas.width - xRange);
				movementFactorX = spriteWidth + shiftX;
			} else {
				xf = scene.getRandomInt(xRange, scene.sys.canvas.width);
				movementFactorX = spriteWidth + Math.abs(shiftX) * -1;
			}
			if (shiftY >= 0) {
				yf = scene.getRandomInt(0, scene.sys.canvas.height / 2 - yRange);
				movementFactorY = spriteHeight + shiftY;
			} else {
				yf = scene.getRandomInt(yRange, scene.sys.canvas.height / 2);
				movementFactorY = spriteHeight + Math.abs(shiftY) * -1;
			}

			enemy.x = xi;
			enemy.y = yi;
			enemy.setCurrentDestination(xf, yf);
			enemy.setActive(true);
			scene.enemies.add(enemy);
			scene.physics.moveTo(enemy, xf, yf, enemy.getMovementSpeed());
			for (let i = 1; i <= groupSize; i++) {
				let enemyCopy = this.generateEnemyByName(enemyName);
				let xf2;
				let yf2;
				if (shiftX < 0) {
					let shift = movementFactorX * i;
					if (Math.sign(shift) == 1) {
						shift *= -1;
					}

					enemyCopy.x = xi + shift;
					xf2 = xf + shift;
				} else {
					enemyCopy.x = xi + movementFactorX * i;
					xf2 = xf + movementFactorX * i;
				}
				if (shiftY < 0) {
					let shift = movementFactorY * i;
					if (Math.sign(shift) == 1) {
						shift *= -1;
					}
					enemyCopy.y = yi + shift;
					yf2 = yf + shift;
				} else {
					enemyCopy.y = movementFactorY * i;
					yf2 = yf + movementFactorY * i;
				}

				enemyCopy.setCurrentDestination(xf2, yf2);
				enemyCopy.setActive(true);
				scene.enemies.add(enemyCopy);
				this.physics.moveTo(enemyCopy, xf2, yf2, enemyCopy.getMovementSpeed());
			}
		};
	}
	update() {
		let cursors = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			space: Phaser.Input.Keyboard.KeyCodes.SPACE,
			bomb: Phaser.Input.Keyboard.KeyCodes.B,
			pause: Phaser.Input.Keyboard.KeyCodes.P,
		});

		//generating a new group of enemies once no enemies are on screen
		if (this.enemies.getLength() == 0) {
			for (let i = 0; i < this.getRandomInt(1, 2); i++) {
				let name = this.generateRandomEnemy(this.enemyList).constructor.name;

				this.generateEnemyGroup(
					this,
					name,
					this.getRandomInt(1, 3),
					this.getRandomInt(-100, 100),
					this.getRandomInt(-100, 100)
				);
			}
		}
		if (this.input.gamepad.gamepads.length > 0) {
			console.log(this.input.gamepad.pad1.leftStick);
			if (
				this.input.gamepad.pad1.left ||
				this.input.gamepad.pad1.leftStick.x <= -0.3
			) {
				this.player.x -= this.player.getMovementSpeed();
			}
			if (
				this.input.gamepad.pad1.right ||
				this.input.gamepad.pad1.leftStick.x >= 0.3
			) {
				this.player.x += this.player.getMovementSpeed();
			}
			if (
				this.input.gamepad.pad1.up ||
				this.input.gamepad.pad1.leftStick.y <= -0.3
			) {
				this.player.y -= this.player.getMovementSpeed();
			}
			if (
				this.input.gamepad.pad1.down ||
				this.input.gamepad.pad1.leftStick.y >= 0.3
			) {
				this.player.y += this.player.getMovementSpeed();
			}
			if (this.input.gamepad.pad1.L2) {
				this.player.useBomb();
			}

			if (
				this.input.gamepad.pad1.A &&
				this.player.getStepsSinceLastShot() >= 15
			) {
				this.player.shoot();
			} else {
				this.player.setStepsSinceLastShot(
					this.player.getStepsSinceLastShot() + 1
				);
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
		if (Phaser.Input.Keyboard.JustDown(cursors.bomb)) {
			this.player.useBomb();
		}

		if (cursors.space.isDown && this.player.getStepsSinceLastShot() >= 15) {
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
