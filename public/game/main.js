var game, gridWidth, gridHeight, viewWidth, viewHeight, tileSize;

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

  game.state.add('menu', mainMenu);
  game.state.add('playing', playing);

  game.state.start('menu');
};
