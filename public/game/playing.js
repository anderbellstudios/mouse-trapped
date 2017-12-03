var map;

var playing = {
  preload: function () {
    game.load.text('level_tileset', '/levels/01.lvl');
    game.load.text('level_lvldata', '/levels/01.json');
    game.load.spritesheet('barrierImage', '/images/barrier.png', 100, 100);
    game.load.spritesheet('floorImage', '/images/floor.png', 100, 100);
  },

  create: function () {
    map = MapGenerator.loadMap('level', game, tileSize);
    map.forEach(function (tile, index) {
      tile.sprite = game.add.sprite(0, 0, tile.image); // create a singleton property
      tile.sprite.width = tileSize;
      tile.sprite.height = tileSize;
    });
  },

  update: function () {
    map.forEach(function (tile, index) {
      tile.sprite.x = tile.position.x;
      tile.sprite.y = tile.position.y;
      tile.sprite.frame = tile.frame(game.time.time);
    });
  }
};
