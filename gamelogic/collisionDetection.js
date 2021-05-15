// module to detect collisions 
export function isPlayerWithinBounds(player , app){
    if(player.x >= app.width){
        player.dx = 0;
        player.dy = 0;
        return false;
    }
    return true;
}