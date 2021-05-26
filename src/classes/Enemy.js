export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.setImmovable(true);
		this.movementSpeed = 3;
		this.hp = 4;
		this.value = 1;

		console.log("enemy object created");
	}

	gotHit() {
		console.log("enemy: " + this + "was hit");
		this.setHp(this.getHp() - 1);
		if (this.getHp() <= 0) {
			this.scene.player.setScore(
				this.scene.player.getScore() + this.getValue()
			);
			this.destroy();
		}
	}
	move() {
		// to be overriden by the extending class
	}
	shoot() {
		// to be overriden by the extending class
	}

	getValue() {
		return this.value;
	}
	setValue(value) {
		this.value = value;
	}
	getHp() {
		return this.hp;
	}
	setHp(hp) {
		this.hp = hp;
	}
}
