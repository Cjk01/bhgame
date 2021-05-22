export default class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setImmovable(true);
		this.lives = 3;
		this.score = 0;
		this.bombs = 2;
		console.log("Bullet object created");
	}
}
