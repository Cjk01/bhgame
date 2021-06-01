export default class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, velX, velY) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setImmovable(true);
		this.setVelocityX(velX);
		this.setVelocityY(velY);
		//console.log("Bullet object created");
	}
	update() {}
}
