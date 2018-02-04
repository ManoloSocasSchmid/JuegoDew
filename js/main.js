var highScore = [];
var game;
var userActual;
var listaDeUsers = [];
var puntos = 0;
var dif;
var map;
var layer;
var layer2;
var player;
var cursors;
var enemyGroup;
var enemy;
var explosion;
var movSpeed = 100;
var dire = [];
var multi = 1;
var lives = 0;
var alive = true;
var fireButton;
var bombs;
var firingTimer = 0;
var nbombas = 2;
var terreno;
var indiceDificultad = 2;
var myLives;
var kills = 0;
var nEnemigos = 3;
var level = 1;
var tiempo= 180;
var timeInterval ;
var text;
var first;

function limpiarMenu() {
  $("#menu").children().remove();
}

function USER(User, Password, Name, Color) {
  this.user = User;
  this.password = Password;
  this.name = Name;
  this.color = Color;
  this.puntuacion = 0;
}

function cargarUsers() {
  listaDeUsers = load('users');
  if (listaDeUsers == null) {
    listaDeUsers = [];
  }
}

function cargarHighScore(){

  highScore = load('score');
  if (highScore == null) {
    highScore = [];
  }
}

function llamarMenu() {
  limpiarMenu();
  var buttonRegistro = $("<input type='button' value='REGISTRO' id='btRegistro' onclick='registro()'/>")
  var buttonLogin = $("<input type='button' value='LOGIN' id='btLogin' onclick='login()'/>")
  $("#menu").append(buttonRegistro, buttonLogin);
}

function llamarScores(){
  var t = $("#score")
  t.find('p').remove()
  for (var i = 0 ; i < highScore.length; i++) {
    var lol  = $("<p>"+(i-1+2)+"- "+highScore[i].name+" "+highScore[i].puntos+"</p>");
    t.append(lol);
  }
}

$(document).ready(function() {
  cargarUsers();
  cargarHighScore();
  llamarScores();
  llamarMenu();
})

function registro() {
  limpiarMenu();
  var form = $("<form id='myForm' action=''></form>")
  var nombre = $("<div ><label class='labels'>Nombre: </label><input type='text' required placeholder='Introduce tu nombre de perfil este será public' id='name'/></div>");
  var nombreUser = $("<div><label class='labels'>Nombre Usuario: </label><input type='text'  required placeholder='Introduce tu nombre de usuario' id='userName'/></div>");
  var contraseña = $("<div><label class='labels'>Contraseña: </label><input type='text'  required placeholder='Introduce tu contraseña' id='contra'/></div>");
  var imagen = $("<div><label class='labels' > Selecciona tu color preferido: </label> </div>");
  var radio1 = $("<label class='check'><div class='white myBts'><input type='radio'  checked name='color' value='white'/></div></label>");
  var radio2 = $("<label class='check'><div class='blue myBts'><input type='radio' name='color' value='blue'/></div></label>");
  var radio3 = $("<label class='check'><div class='red myBts'><input type='radio' name='color' value='red'/></div></label>");
  var radio4 = $("<label class='check'> <div class='black myBts'><input type='radio' name='color' value='black'/></div></label>");
  imagen.append(radio1, radio2, radio3, radio4);
  var buttonConfirmar = $("<input type='submit' onclick='registrar(),false' value='Confirmar' id='btConfirm'>");
  form.append(nombre, nombreUser, contraseña, imagen, buttonConfirmar);
  $("#menu").append(form);
}

function login() {
  limpiarMenu();
  var nombre = $("<div><label>Nombre Usuario: </label class='labels' ><input type='text' placeholder='Introduce tu nombre de usuario' id='nombre'/></div>");
  var contraseña = $("<div><label>Contraseña: </label class='labels' ><input type='password' placeholder='Introduce tu contraseña' id='contra'/></div>");
  var buttonConfirmar = $("<div><input type='button' value='Confirmar' id='btConfirm' onclick='comprobar()'/></div>");
  $("#menu").append(nombre, contraseña, buttonConfirmar);
}

function registrar() {
  var palanca = false;
  var userName = $("#userName").val();
  var name = $("#name").val();
  var color = $('input[type="radio"]').filter(':checked').val();
  var pass = $('#contra').val();
  userActual = new USER(userName, pass, name, color);
  //checkUser if ok add user
  for (var i = 0; i < listaDeUsers.length; i++) {
    if (listaDeUsers[i].user == userActual.user || listaDeUsers[i].name == userActual.name) {
      palanca == true;
    }
  }
  if (palanca) {
    alert("El nombre o el usuario ya existen");
    registro();
  } else {
    listaDeUsers.push(userActual);
    save(listaDeUsers, "users");
  }
  login();
}

function comprobar() {
  var palanca = false;
  var user = $("#nombre").val();
  var pass = $("#contra").val();
  for (var i = 0; i < listaDeUsers.length; i++) {
    if (listaDeUsers[i].user == user && listaDeUsers[i].password == pass) {
      palanca = true;
      userActual = listaDeUsers[i];
    }
  }
  if (palanca) {
    crearHud();
  } else {
    alert("Nombre o contraseña incorrectos");
    login();
  }
}

function crearHud() {
  limpiarMenu();
  var nombre = $("<h2 id ='title2'>" + userActual.name + "</h2>");
  var puntuacion = $("<h2 id='puntuacion'>Puntuación: 0 </h2>")
  var second = $("<div></div>")
  var button1 = $("<button type='button' class='btn btn-primary' onclick='start(1),false'>Easy Peasy</button>");
  var button2 = $("<button type='button' class='btn btn-warning' onclick='start(2),false'>Hard</button>");
  var button3 = $("<button type='button' class='btn btn-danger' onclick='start(3),false'>DarkSouls</button>");
  second.append(button1, button2, button3);
  $("#menu").append(nombre, puntuacion, second)
}

function start(num) {
  $("#puntuacion").text("Puntuación: " + puntos + "");
  tiempo = 180;
  dif = 0;
  dif = num;
  first = true;
  if (game != null) {
      puntuacion = 0;
      time = 180;
      level = 1;
    restart();

  }else{
    game = new Phaser.Game(240, 280, Phaser.CANVAS, 'phaser-example', {
      preload: preload,
      create: create,
      update: update,
      render: render
    });
  }

}

function restart(){
  lives = 0;
  nbombas = 2;
  alive = true;
  kills = 0;
  game.state.restart()
}

function preload() {

  //game.load.spritesheet('player1', 'assets/img/player1.png', 16, 23);
  switch (true) {
    case(userActual.color == "white"):
      game.load.spritesheet('players', 'assets/img/player1.gif', 17, 24);
      break;
    case(userActual.color == "blue"):
      game.load.spritesheet('players', 'assets/img/player2.gif', 17, 24);
      break;
    case(userActual.color == "red"):
      game.load.spritesheet('players', 'assets/img/player3.gif', 17, 24);
      break;
    case(userActual.color == "black"):
      game.load.spritesheet('players', 'assets/img/player4.gif', 17, 24);
      break;
  }

  //game.load.image('background', 'assets/img/background.png');
  game.load.image('face', 'assets/img/face.png');
  game.load.tilemap('bomberman', 'assets/maps/bomberman.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'assets/img/tiles2.png'); //
  game.load.spritesheet('monstruo1', 'assets/img/monter1.gif', 16, 24);
  game.load.spritesheet('bomb', 'assets/img/bomb.gif', 16, 16);
  game.load.spritesheet('bomb2', 'assets/img/bomb2.gif', 16, 16);
  game.load.spritesheet('imgObjeto', 'assets/img/cofre.png', 16, 16);

}

function create() {
  //color fondo;
  game.stage.backgroundColor = '#000';

  // generacion de mapa
  map = game.add.tilemap('bomberman');
  map.addTilesetImage('background', 'tiles');
  map.setCollisionBetween(11, 13);
  map.setCollision(1);

  layer = map.createLayer('level1');

  //layer = map.createLayer('level1');
  layer.resizeWorld();

  // creamos el jugador.
  crearJugador();

  // creamos enemigo

  crearGrupoDeEnemigos();
  crearGrupoDeBombas();
  crearEXPLOSIONES();
  crearGrupoTerreno();

  cursors = game.input.keyboard.createCursorKeys();
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  setInterval(selectDirection, 1000 / multi);
  myLives = game.add.group();
  game.add.text(game.world.width - 140, 260, 'Lives : ', {
    font: '16px Arial',
    fill: '#fff'
  });
  for (var i = 0; i < (4 - dif); i++) {
    var ship = myLives.create(game.world.width - 70 + (30 * i), 280, 'face');
    ship.anchor.setTo(1, 1);
    lives++;

  }

  text = game.add.text(10 , 250 , "Time: ", {
    font: '10px Arial',
    fill: '#fff'
  });

  game.add.text(10 , 270 , "Nivel: "+level+" ", {
    font: '10px Arial',
    fill: '#fff'
  });

  timeInterval =  setInterval(function(){
    tiempo -- ;
  },1000)
}

function crearGrupoTerreno() {
  terreno = game.add.group();
  terreno.enableBody = true;
  game.physics.enable(terreno, Phaser.Physics.ARCADE);
  crearTerreno();
}

function crearTerreno() {
  for (let x = 2; x <= 14; x++) {
    for (let y = 2; y <= 14; y++) {
      var random = Math.round(Math.random() * (10 + 1) + -1);
      if (random > 5) {
        if ((!(x <= 3 && y <= 3)) && (!(x >= 12 && y >= 12)) && !(x % 2 != 0 && y % 2 != 0) && (x != y)) {
          crearBloque(x, y);
        }
      }

    }
  }
}

function crearBloque(posiX, posiY) {
  var size = 16;
  var block = terreno.create(posiX * size, posiY * size, 'imgObjeto');
  block.anchor.setTo(1, 1);

  block.animations.add('stand', [0], 10, true);

  block.animations.play('stand', 3, false);

  block.body.setSize(16, 16);
  //game.physics.enable(enemy, Phaser.Physics.ARCADE);
  game.physics.enable(block, Phaser.Physics.ARCADE);
  block.body.collideWorldBounds = true;
  block.body.immovable = true;
}

function crearJugador() {
  player = game.add.sprite(32, 32, 'players');

  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.collideWorldBounds = true;

  //Ajustar el cuerpo del sprite para que las colisiones del terreno.
  player.body.setSize(8, 8, 5, 14);
  player.anchor.setTo(1, 1);

  //animaciones de movimiento del jugador.
  player.animations.add('up', [
    3, 4, 5, 4
  ], 10, true);
  player.animations.add('down', [
    12, 13, 14, 13
  ], 10, true);
  player.animations.add('left', [
    9, 10, 11, 10
  ], 10, true);
  player.animations.add('right', [
    15, 16, 17, 16
  ], 10, true);
  player.animations.add('stand', [13], 10, true);

  player.animations.play('stand', 3, false);

}

function crearGrupoDeEnemigos() {
  enemyGroup = game.add.group();
  enemyGroup.enableBody = true;
  game.physics.enable(enemyGroup, Phaser.Physics.ARCADE);
  crearEnemigoTipo1();
}

function crearGrupoDeBombas() {
  bombs = game.add.group();
  bombs.enableBody = true;
  game.physics.enable(bombs, Phaser.Physics.ARCADE);
  bombs.createMultiple(2, 'bomb');
}

function crearEXPLOSIONES() {
  explosion = game.add.group();
  explosion.enableBody = true;
  game.physics.enable(explosion, Phaser.Physics.ARCADE);
}

function crearEnemigoTipo1() {
  for (let x = 1; x < nEnemigos+1; x++) {

      enemy = enemyGroup.create(x * 32+16, x* 32, 'monstruo1');

      enemy.animations.add('up', [
        7, 6, 8, 6
      ], 10, true);
      enemy.animations.add('down', [
        1, 0, 2, 0
      ], 10, true);
      enemy.animations.add('left', [
        4, 3, 5, 3
      ], 10, true);
      enemy.animations.add('right', [
        11, 10, 12, 10
      ], 10, true);
      enemy.animations.add('stand', [1], 10, true);
      enemy.stopped_frames = [7, 1, 4, 11, 1];
      enemy.animations.play('stand', 3, false);

      enemy.body.setSize(10, 10, 1, 9);
      //game.physics.enable(enemy, Phaser.Physics.ARCADE);
      game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.body.collideWorldBounds = true;
      //Ajustar el cuerpo del sprite para que las colisiones del terreno.
      //animaciones de movimiento del jugador.

  }
}

function update() {
  text.destroy();
  text = game.add.text(10 , 250 ,"Time : "+ tiempo , {
    font: '10px Arial',
    fill: '#fff'
  });

  if (alive && tiempo > 0) {

    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(player, terreno);
    game.physics.arcade.collide(enemyGroup, layer);
    game.physics.arcade.collide(enemyGroup, terreno);
    game.physics.arcade.collide(player, bombs);
    game.physics.arcade.collide(enemyGroup, bombs);
    game.physics.arcade.collide(enemyGroup, explosion);
    game.physics.arcade.collide(player, explosion);
    game.physics.arcade.collide(terreno, explosion);

    player.body.velocity.set(0);

    moverPlayer();

    for (var i = 0; i < enemyGroup.length; i++) {
      moveEnemy(enemyGroup.children[i], i);
    }

    game.physics.arcade.overlap(player, enemyGroup, receiveDamage);
    game.physics.arcade.overlap(player, explosion, receiveDamage);
    game.physics.arcade.overlap(terreno, explosion, destruyeBlocke, null, this);
    game.physics.arcade.overlap(explosion, enemyGroup, killEnemy, null, this);
  }
  else{
    clearInterval(timeInterval);
    game.add.text(10, 40, 'GAME OVER', {
      font: '36px Arial',
      fill: 'red'


    });
      if(first){
        addScores();
        first = false;
      }

  }

}

function destruyeBlocke(thisBlock, explos) {
  thisBlock.kill();
}

function moverPlayer() {
  if (cursors.left.isDown) {
    player.body.velocity.x = -movSpeed;
    player.animations.play('left', 8, false);

  }
  if (cursors.right.isDown) {
    player.body.velocity.x = + movSpeed;
    player.animations.play('right', 8, false);

  }
  if (cursors.up.isDown) {
    player.body.velocity.y = -movSpeed;
    player.animations.play('up', 8, false);

  }
  if (cursors.down.isDown) {
    player.body.velocity.y = + movSpeed;
    player.animations.play('down', 8, false);

  }
  if (fireButton.isDown) {
    plantBomb(player);
  }
}

function killEnemy(explosion, thisEnemy) {
  thisEnemy.kill();
  kills ++ ;
  puntos = puntos + 100*dif/2;
  $("#puntuacion").text("Puntuación: " + puntos + "");
  if(kills == enemyGroup.children.length){
    nEnemigos +=level;

    level++;
    if(level <= 3){
      restart();
    }
    else{
      game.add.text(10, 40, 'YOU WIN (This time)', {
        font: '26px Arial',
        fill: 'red'
      });

    }

  }
}

function render() {
  game.debug.body(enemy);
  game.debug.body(player);

}

function receiveDamage(player, thisEnemy) {
  player.kill();
  lives--;
  myLives.children[lives].kill()
  if (lives == 0) {
    alive = false;
    addScores();
  } else {
    setTimeout(function() {
      player.reset(32, 32);
    }, 500);

  }
}

function selectDirection() {
  for (var i = 0; i < enemyGroup.length; i++) {
    dire[i] = Math.round(Math.random() * (4 + 1) + 0);
  }

}

function moveEnemy(thisEnemy, num) {
  thisEnemy.body.velocity.set(0);
  switch (dire[num]) {
    case 0:
      break;
    case 1:
      thisEnemy.body.velocity.x = -(movSpeed *dif) /2;
      thisEnemy.animations.play('left', 8, 2);
      break;
    case 2:
      thisEnemy.body.velocity.x = + (movSpeed *dif)/ 2;
      thisEnemy.animations.play('right', 8, 2);
      break;
    case 3:
      thisEnemy.body.velocity.y = -(movSpeed *dif)/ 2;
      thisEnemy.animations.play('up', 8, 2);
      break;
    case 4:
      thisEnemy.body.velocity.y = +(movSpeed *dif)/ 2;
      thisEnemy.animations.play('down', 8, 2);
      break;
  }
}

function plantBomb(playerBomb) {
  if (game.time.now > firingTimer) {
    var posiX = playerBomb.position.x;
    var posiY = playerBomb.position.y;
    bomb = new Bomb(posiX, posiY, 3);
    bomb.create();
    firingTimer = game.time.now + 1000;
    setTimeout(function() {
      explode();
    }, 3000/dif);

  }

  function explode() {
    bombs.children[nbombas].kill()
    createExplosion(bombs.children[nbombas].position.x, bombs.children[nbombas].position.y);
    ++nbombas;
  }
}

function createExplosion(posiX, posiY) {
  var x = 0,
    y = 0;
  var animacion = 14
  for (var i = 0; i < 9; i++) {
    switch (i) {
      case 0:
        x = 0;
        y = 0;
        animacion = 14;
        break;
      case 1:
        x = -16;
        y = 0;
        animacion = 13;
        break;
      case 2:
        x = -32;
        y = 0;
        animacion = 13;
        break;
      case 3:
        x = 16;
        y = 0;
        animacion = 13;
        break;
      case 4:
        x = 32;
        y = 0;
        animacion = 13;
        break;
      case 5:
        x = 0;
        y = -16;
        animacion = 12;
        break;
      case 6:
        x = 0;
        y = -32;
        animacion = 12;
        break;
      case 7:
        x = 0;
        y = 16;
        animacion = 12;
        break;
      case 8:
        x = 0;
        y = 32;
        animacion = 12;
        break;
    }
    var exp = explosion.create(posiX - x, posiY - y, 'bomb');
    exp.anchor.setTo(1);

    exp.animations.add('stand', [animacion], 1, true);
    exp.animations.play('stand', 3, true);

    exp.body.setSize(10, 10);
    //game.physics.enable(enemy, Phaser.Physics.ARCADE);
    game.physics.enable(exp, Phaser.Physics.ARCADE);
    exp.body.collideWorldBounds = true;
    exp.body.immovable = true;
  }
  setTimeout(elimnarExplosiones, 400);
}

function elimnarExplosiones() {
  for (var i = 0; i < explosion.length; i++) {
    explosion.children[i].kill()
  }
}

function addScores(){
  first = false;
  puntos = puntos + parseInt(tiempo*dif/2);
  score = {name:userActual.name, puntos:puntos}
  highScore.push(score);
  highScore.sort(function (a,b){
    if(a.puntos > b.puntos){
      return -1;
    }
    if(a.puntos < b.puntos){
      return 1;
    }
    return 0;
  })
  if(highScore.length > 10 ){
    while(highScore.length > 10){
      highScore.pop()
    }
  }
  save(highScore,'score');
  llamarScores();
  puntos = 0;

}
