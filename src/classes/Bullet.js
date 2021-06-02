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
	destroyIfOutOfBounds() {
		if (
			this.x > this.scene.game.canvas.width ||
			this.x < 0 ||
			this.y > this.scene.game.canvas.height ||
			this.y < 0
		) {
			console.log("Destroying bullet at : " + " x: " + this.x + "y: " + this.y);
			this.destroy();
		}
	}
}
