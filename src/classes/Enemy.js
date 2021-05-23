export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.setImmovable(true);

		this.value;

		console.log("enemy object created");
	}
	gotHit() {
		console.log("I got hit");
	}
	move() {}
	shoot() {}
	//score value should be readonly
	getValue() {
		return this.value;
	}
}
