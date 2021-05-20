import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene
{
constructor()
{
super('game');

}
preload()
{
    this.load.image('background' , '../../assets/Background/BackgroundMoon.png');
    this.load.image('player1' , '../../assets/playerSprites/PlayerShipIdle1.png');
    this.load.image('player2' , '../../assets/playerSprites/PlayerShipIdle2.png');
    this.load.image('playerLeft1' , '../../assets/playerSprites/PlayerShipLeftTilt1.png');
    this.load.image('playerLeft2' , '../../assets/playerSprites/PlayerShipLeftTilt2.png');
    this.load.image('playerRight1' , '../../assets/playerSprites/PlayerShipRightTilt1.png');
    this.load.image('playerRight2', '../../assets/playerSprites/PlayerShipRightTilt2.png');
    this.load.image('playerBullet' , '../../assets/playerSprites/PlayerBullet.png');
    this.load.image('playerExplosion1', '../../assets/playerSprites/PlayerShipExplosion2.png');
    this.load.image('playerExplosion2', '../../assets/playerSprites/PlayerShipExplosion3.png');
    this.load.image('playerExplosion3', '../../assets/playerSprites/PlayerShipExplosion4.png');
    this.load.image('enemyBullet' , '../../assets/Bullet/EnemyBullet.png');
    this.load.image('enemy' , '../../assets/Enemies/DakanIdle.png');
}
create()
{
    
    this.add.image(250, 350, 'background');
    this.player = this.physics.add.sprite(250, 600, 'player1');
    this.player.setCollideWorldBounds(true);
    this.player.setImmovable(true);
    this.enemy = this.physics.add.sprite(500, 500, 'enemy');
    this.enemy.setCollideWorldBounds(true);
    this.enemy.setImmovable(true);
    this.bullets = this.physics.add.group();
   
    this.physics.add.overlap(this.player , this.bullets);
    function playerHit() {
       // this.player.anims.play('explode', true);
        //console.log("player dead");
        
    }
    this.physics.add.collider(this.player, this.bullets , playerHit);

    this.anims.create({
    key: 'left',
    frames: [
        { key: 'playerLeft1', frame: null },
        { key: 'playerLeft2', frame: null },
        
    ],
    frameRate: 8,
    repeat: -1
    });
    
    this.anims.create({
    key: 'right',
    frames: [
        { key: 'playerRight1', frame: null },
        { key: 'playerRight2', frame: null },
        
    ],
    frameRate: 8,
    repeat: -1
    });
    this.anims.create({
        key: 'explode',
    frames: [
        { key: 'playerExplosion1' , frame: null},
        { key: 'playerExplosion2', frame: null},
        { key: 'plaerExplosion3' , frame: null}
        
    ],
    frameRate: 10,
    repeat: 1
    });
}
update()
{
    const movementSpeed = 8;
    let cursors = this.input.keyboard.createCursorKeys();
    
    if (cursors.left.isDown)
    {
  
       
       this.player.x -= movementSpeed;
       
    }
    else if (cursors.right.isDown)
    {
        
        this.player.x += movementSpeed;
    }
    else
    {
        this.player.anims.stop();
        
    }
    if (cursors.up.isDown)
    {
   
        this.player.y -= movementSpeed;
    }
    else if(cursors.down.isDown){
        this.player.y += movementSpeed;
    }
    else
    {
        
        
    }
    let randX = Math.floor(Math.random() * 50); 
    let randY = Math.floor(Math.random() * 50); 
    let Xpos = Math.floor(Math.random() * 2); 
    let Ypos = Math.floor(Math.random() * 2); 

    
    if(Xpos >= 1){
       this.enemy.x += randX;
    }
    else {
        this.enemy.x -= randX;
    }
    if(Ypos >= 1){
        this.enemy.y += randY;
    }
    else {
        this.enemy.y -= randY;
    }
   let bullets = [];
   for(let i = 0 ; i < 3; i++){
    let bullet = this.bullets.create(this.enemy.x + i, this.enemy.y + 30 - i, 'enemyBullet');
    bullet.setImmovable(true);
    bullets.push(bullet);
   }
   for(let i = 0 ; i < 3; i++){
    let bullet = this.bullets.create(this.enemy.x - i, this.enemy.y + 30 + i, 'enemyBullet');
    bullet.setImmovable(true);
    bullets.push(bullet);
   }
   function killBullet(b) {
    
    
}
   bullets.forEach(bullet => {
    bullet.setCollideWorldBounds(true);
    bullet.body.onWorldBounds = true;
    bullet.body.world.on('worldbounds', function(body) {
        
        // Checks if it's the sprite that you'listening for
        if (body.gameObject === this) {
          // Make the enemy sprite unactived & make it disappear
          this.destroy();
        }
      }, bullet);
    bullet.setVelocityX( Math.floor(Math.random() * 300));
    bullet.setVelocityY( Math.floor(Math.random() * 300));
   });
}
}