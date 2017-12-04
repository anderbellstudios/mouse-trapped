var game, gridWidth, gridHeight, viewWidth, viewHeight, tileSize;

var user_settings = {
  music_enabled: true,
  sounds_enabled: true
}

var main_menu = [
  { name: 'play',         onclick: function () { game.state.start('playing', true, false, '01'); } },
  { name: 'instructions', onclick: function () { window.open('/instructions'); } },
  { name: 'options',      onclick: function () { game.state.start('menu', true, false, 'options', options_menu); } }
];

var options_menu = [
  { name: 'music',  onclick: function () { game.state.start('menu', true, false, 'music', music_menu); } },
  { name: 'sounds', onclick: function () { game.state.start('menu', true, false, 'sounds', sounds_menu); } },
  { name: 'back',   onclick: function () { game.state.start('menu', true, false, 'main_menu', main_menu); } }
];

var music_menu = [
  { name: 'on',  onclick: function () { user_settings.music_enabled = true;  game.state.start('menu', true, false, 'options', options_menu); } },
  { name: 'off', onclick: function () { user_settings.music_enabled = false; game.state.start('menu', true, false, 'options', options_menu); } }
];

var sounds_menu = [
  { name: 'on',  onclick: function () { user_settings.sounds_enabled = true;  game.state.start('menu', true, false, 'options', options_menu); } },
  { name: 'off', onclick: function () { user_settings.sounds_enabled = false; game.state.start('menu', true, false, 'options', options_menu); } }
];

window.onload = function() {
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

  game.state.add('menu', menu);
  game.state.add('playing', playing);
  game.state.add('cutscene', cutscene);

  game.state.start('menu', true, false, 'main_menu', main_menu);
};
