export default class Bullet {
    constructor(sprite) {
        this.sprite = sprite;
        console.log("bullet object created");
    }
    getSprite() {
        return this.sprite;
    }
    setSprite(sprite) {
        this.sprite = sprite;
    }
}