export default class Player {
    constructor (sprite) {
        this.sprite = sprite;
        this.lives = 3;
        this.score = 0;
        console.log("player object created");
        
        
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
    setSprite(sprite){
        this.sprite = sprite;
    }
    getSprite() {
        return this.sprite;
    }


}