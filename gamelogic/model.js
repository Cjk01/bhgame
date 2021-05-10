class player {
    
    constructor(){
        //stub class
        console.log("player created");
        this.lives = 3;
        this.width = 50;
        this.height = 50;
        this.xPos = 50;
        this.yPos = 50;
        this.currentSpriteShown;
    
    }
    up(e) {
        console.log(e + "pressed");
    }
    down(e) {
        console.log(e + "pressed");
    }
    left(e) {
        console.log(e + "pressed");
    }
    right(e) {
        console.log(e + "pressed");
    }
    shoot(e) {
        console.log(e + "pressed");
    }

}
class enemy {
    constructor() {
        //stub class
        console.log("enemy created");
    }
}
export {model};