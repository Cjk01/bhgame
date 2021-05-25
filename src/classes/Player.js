export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.setImmovable(true);
		this.lives = 3;
		this.score = 0;
		this.bombs = 2;
		console.log("player object created");
	}
	gotHit() {
		console.log("i got hit!!");
		this.setLives(this.getLives() - 1);
		console.log("player now has " + this.getLives() + " lives");
	}
	shoot() {
		console.log(this.scene.enemies);
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
}
