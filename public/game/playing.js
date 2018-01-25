var music, map, player, lvlId, lvlData;
var cutsceneInProgress = false;

var playing = {
  init: function (lvl) {
    lvlId = lvl;
  },

  preload: function () {
    game.load.text('tileset', '/levels/' + lvlId + '.lvl');
    game.load.text('lvldata', '/levels/' + lvlId + '.json');
  },

  create: function () {
    var tileset = game.cache.getText('tileset');
    lvldata = JSON.parse(game.cache.getText('lvldata'));

    if (user_settings.music_enabled) {
      music = game.add.sound(lvldata.music, 1, true);
      music.play();
    }

    $('#message').text(lvldata.message);

    map = MapGenerator.loadMap(tileset, lvldata, game, tileSize);

    var startTileId = lvldata.start;

    playerPosition = {
      x: 0, y: 0
    };

    map.forEach(function (tile, index) {
      tile.sprite = game.add.sprite(0, 0, tile.image); // create a singleton property
      tile.sprite.width = tileSize;
      tile.sprite.height = tileSize;

      if (tile.tileId == startTileId) {
        playerPosition = tile.position;
      }
    });

    player = new Player(
      game,
      playerPosition,
      {width: tileSize, height: tileSize},
      'playerImage',
      FirstResponder.playerTriedToMove
    );

    player.setFrame(lvldata.playerOrientation);

    this.game.input.keyboard.onDownCallback = FirstResponder.keyDown;
  },

  update: function () {
    map.forEach(function (tile, index) {
      tile.sprite.x = tile.position.x;
      tile.sprite.y = tile.position.y;
      tile.sprite.frame = tile.frame(game.time.time);
    });
  }
};


FirstResponder = {
  keyDown: function (keypress) {
    if (player.isMoving || cutsceneInProgress) {
      return false;
    }

    switch (keypress.keyCode) {
      case Phaser.KeyCode.H:
      case Phaser.KeyCode.A:
      case Phaser.KeyCode.LEFT:
        player.walk({ dx: -tileSize, dy: 0 });
        player.setFrame(0);
        break;
      case Phaser.KeyCode.J:
      case Phaser.KeyCode.S:
      case Phaser.KeyCode.DOWN:
        player.walk({ dx: 0, dy: tileSize });
        player.setFrame(1);
        break;
      case Phaser.KeyCode.K:
      case Phaser.KeyCode.W:
      case Phaser.KeyCode.UP:
        player.walk({ dx: 0, dy: -tileSize });
        player.setFrame(2);
        break;
      case Phaser.KeyCode.L:
      case Phaser.KeyCode.D:
      case Phaser.KeyCode.RIGHT:
        player.walk({ dx: tileSize, dy: 0 });
        player.setFrame(3);
        break;
      case Phaser.KeyCode.Q:
        music.stop();
        var next_lvl = prompt("Jump to level");
        game.state.start('playing', true, false, next_lvl);
        break;
    }
  },

  playerTriedToMove: function (player, position) {
    var target;
    var landedOn;

    map.forEach(function (tile, index) {
      target = tile.position;
      if (position.x == target.x && position.y == target.y) {
        landedOn = tile;
      }
    });

    if (landedOn) {
      return landedOn.wasLandedOnBy(player, game.time.time);
    } else {
      return false;
    }
  }
};
