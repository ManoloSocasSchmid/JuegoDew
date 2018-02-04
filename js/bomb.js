

 function Bomb (positionX,positionY,powerX){
  this.posiX = positionX;
  this.posiY = positionY;
  this.power = powerX;
  this.bomb =  null;


}

Bomb.prototype.create = function (){
    var random = Math.round(Math.random() * (10 + 1) + -1);
    if (random >= 9 ){
          this.bomb = bombs.create(this.posiX, this.posiY, 'bomb2');
    }
    else{
        this.bomb = bombs.create(this.posiX, this.posiY, 'bomb');
    }

  this.bomb.anchor.setTo(1);

  this.bomb.animations.add('blow', [
    1, 2, 3
  ], 1, true);
  this.bomb.animations.play('blow', 3, true);

  this.bomb.body.setSize(20, 20);
  //game.physics.enable(enemy, Phaser.Physics.ARCADE);
  game.physics.enable(this.bomb, Phaser.Physics.ARCADE);
  this.bomb.body.collideWorldBounds = true;
  if (random >= 9) {
    this.bomb.body.immovable = false;
  }
  else{
        this.bomb.body.immovable = true;
  }

}

Bomb.prototype.explode = function (){

      this.bomb.kill();
}
