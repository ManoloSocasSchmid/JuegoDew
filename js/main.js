var game = new Phaser.Game(240, 240, Phaser.CANVAS, 'phaser-example', {
	preload: preload,
	create: create,
	update: update,
	render: render
});

function preload() {


	//game.load.spritesheet('player1', 'assets/img/player1.png', 16, 23);
	//game.load.image('background', 'assets/img/background.png');
	game.load.tilemap('bomberman','assets/maps/bomberman.json',null,Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles', 'assets/img/tiles2.png');//

}

var map;
var layer;
var layer2;
/*
var player;
var aliens;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];
*/
function create(){
 game.stage.backgroundColor = '#787878';
	//escenario = game.add.tileSprite(0, 0, 800, 800, 'background');
	//game.physics.startSystem(Phaser.Physics.ARCADE);
	map = game.add.tilemap('bomberman');
	map.addTilesetImage('background','tiles');
	layer2 = map.createLayer('background');
	layer = map.createLayer('level1');
	layer.resizeWorld();

}

/*

function createAliens() {


	for (var y = 0; y < 1; y++) {
		for (var x = 0; x < 1; x++) {
			var alien = aliens.create(x * 48, y * 50, 'invader');
			alien.anchor.setTo(0.5, 0.5);
			alien.animations.add('fly', [0, 1, 2, 3], 20, true);
			alien.play('fly');
			alien.body.moves = false;
		}
	}

	aliens.x = 100;
	aliens.y = 100;

	//  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
	var tween = game.add.tween(aliens).to({
		x: 750
	}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

	//  When the tween loops it calls descend
	tween.onLoop.add(descend, this);
}


function setupInvader(invader) {

	invader.anchor.x = 0.5;
	invader.anchor.y = 0.5;
	invader.animations.add('kaboom');

}

function descend() {

	aliens.y += 10;

}*/

function update() {
	/*
		//  Scroll the background
		starfield.tilePosition.y += 2;

		if (player.alive) {
			//  Reset the player, then check for movement keys
			player.body.velocity.setTo(0, 0);

			if (cursors.left.isDown) {
				player.body.velocity.x = -200;
			} else if (cursors.right.isDown) {
				player.body.velocity.x = 200;
			}

			//  Firing?
			if (cursors.up.isDown) {
				fireBullet();
			}

			if (game.time.now > firingTimer) {
				enemyFires();
			}

			//  Run collision
			game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
			game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
		}
	*/
}

function render() {

	// for (var i = 0; i < aliens.length; i++)
	// {
	//     game.debug.body(aliens.children[i]);
	// }

}
/*
function collisionHandler(bullet, alien) {

	//  When a bullet hits an alien we kill them both
	bullet.kill();
	alien.kill();

	//  Increase the score
	score += 20;
	scoreText.text = scoreString + score;

	//  And create an explosion :)
	var explosion = explosions.getFirstExists(false);
	explosion.reset(alien.body.x, alien.body.y);
	explosion.play('kaboom', 30, false, true);

	if (aliens.countLiving() == 0) {
		score += 1000;
		scoreText.text = scoreString + score;

		enemyBullets.callAll('kill', this);
		stateText.text = " You Won, \n ";
		stateText.visible = true;

		//the "click to restart" handler
		//game.input.onTap.addOnce(restart, this);
	}

}

function enemyHitsPlayer(player, bullet) {

	bullet.kill();

	live = lives.getFirstAlive();

	if (live) {
		live.kill();
	}

	//  And create an explosion :)
	var explosion = explosions.getFirstExists(false);
	explosion.reset(player.body.x, player.body.y);
	explosion.play('kaboom', 30, false, true);

	// When the player dies
	if (lives.countLiving() < 1) {
		player.kill();
		enemyBullets.callAll('kill');

		stateText.text = " GAME OVER";
		stateText.visible = true;

		//the "click to restart" handler
		//game.input.onTap.addOnce(restart, this);
	}

}

function enemyFires() {

	//  Grab the first bullet we can from the pool
	enemyBullet = enemyBullets.getFirstExists(false);

	livingEnemies.length = 0;

	aliens.forEachAlive(function(alien) {

		// put every living enemy in an array
		livingEnemies.push(alien);
	});


	if (enemyBullet && livingEnemies.length > 0) {

		var random = game.rnd.integerInRange(0, livingEnemies.length - 1);

		// randomly select one of them
		var shooter = livingEnemies[random];
		// And fire the bullet from this enemy
		enemyBullet.reset(shooter.body.x, shooter.body.y);

		game.physics.arcade.moveToObject(enemyBullet, player, 120);
		firingTimer = game.time.now + 2000;
	}

}

function fireBullet() {

	//  To avoid them being allowed to fire too fast we set a time limit
	if (game.time.now > bulletTime) {
		//  Grab the first bullet we can from the pool
		bullet = bullets.getFirstExists(false);

		if (bullet) {
			//  And fire it
			bullet.reset(player.x, player.y + 8);
			bullet.body.velocity.y = -400;
			bulletTime = game.time.now + 200;
		}
	}

}

function resetBullet(bullet) {

	//  Called if the bullet goes out of the screen
	bullet.kill();

}

function restart() {

	//  A new level starts

	//resets the life count
	lives.callAll('revive');
	//  And brings the aliens back from the dead :)
	aliens.removeAll();
	createAliens();

	//revives the player
	player.revive();
	//hides the text
	stateText.visible = false;

}*/
