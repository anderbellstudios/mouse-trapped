var game, gridWidth, gridHeight, viewWidth, viewHeight, tileSize;

var user_settings = {
  music_enabled: true,
  sounds_enabled: true
}

function launch_menu(name, buttons) {
  game.state.start('menu', true, false, name, buttons);
}

var main_menu = [
  { name: 'play',    onclick: function () { game.state.start('playing', true, false, '01'); } },
  { name: 'options', onclick: function () { launch_menu('options', options_menu); } }
];

var options_menu = [
  { name: 'music',  onclick: function () { launch_menu('music', music_menu); } },
  { name: 'sounds', onclick: function () { launch_menu('sounds', sounds_menu); } },
  { name: 'back',   onclick: function () { launch_menu('main_menu', main_menu); } }
];

var music_menu = [
  { name: 'on',  onclick: function () { user_settings.music_enabled = true;  launch_menu('options', options_menu); } },
  { name: 'off', onclick: function () { user_settings.music_enabled = false; launch_menu('options', options_menu); } }
];

var sounds_menu = [
  { name: 'on',  onclick: function () { user_settings.sounds_enabled = true;  launch_menu('options', options_menu); } },
  { name: 'off', onclick: function () { user_settings.sounds_enabled = false; launch_menu('options', options_menu); } }
];

function fadeToLevel(lvl, msg, cutscene) {
  if (music != undefined) {
    music.stop();
  }

  if (dialogue != undefined) {
    dialogue.stop();
  }

  cutsceneInProgress = true;
  $('#message').text(msg);
  Fade.toBlack(game, 1000, function () {
    game.state.start("cutscene", true, false, cutscene, function () {
      game.state.start('playing', true, false, lvl);
      cutsceneInProgress = false;
    });
  });
}

window.addEventListener("load",function(event) {
  gridWidth = 16;
  gridHeight = 12;

  var maxWidth  = window.innerWidth  * 0.75;
  var maxHeight = window.innerHeight * 0.75;

  var idealTileWidth  = Math.floor(maxWidth  / gridWidth);
  var idealTileHeight = Math.floor(maxHeight / gridHeight);

  tileSize = Math.min(idealTileWidth, idealTileHeight);

  viewWidth  = gridWidth  * tileSize; 
  viewHeight = gridHeight * tileSize; 

  game = new Phaser.Game(
    viewWidth, 
    viewHeight, 
    Phaser.CANVAS
  );

  game.state.add('boot', boot);
  game.state.add('preloader', preloader);
  game.state.add('menu', menu);
  game.state.add('playing', playing);
  game.state.add('cutscene', cutscene);
  game.state.add('death', death);

  game.state.start('boot');
}, false);
