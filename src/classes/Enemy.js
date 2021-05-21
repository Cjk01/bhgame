export default class Enemy {
    constructor(sprite) {
        this.sprite = sprite;
        this.value;
        console.log("enemy object created");

    }
    //score value should be readonly
    getValue() {
        return this.value;
    }
    getSprite() {
        return this.sprite;
    }
    setSprite(sprite) {
        this.sprite = sprite;
    }
}