var music, map, player, creatures, things, lvlId, lvlData, gameInProgress;
var cutsceneInProgress = false;

function creatureDidDie(creature) {
  creatures.splice(creatures.indexOf(creature), 1);
  things.splice(things.indexOf(creature), 1);
}

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

    gameInProgress = true;

    if (user_settings.music_enabled) {
      music = game.add.sound(lvldata.music, 1, true);
      music.play();
    }

    $('#message').text(lvldata.message);

    map = MapGenerator.loadMap(tileset, lvldata, tileSize);
    creatures = CreatureGenerator.loadCreatures(lvldata.creatures, tileSize, FirstResponder.creatureTriedToMove);
    things = map.concat(creatures);

    player = creatures[lvldata.player];

    things.forEach(function (thing, index) {
      thing.sprite = game.add.sprite(0, 0, thing.image); 
      thing.sprite.width = tileSize;
      thing.sprite.height = tileSize;
    });

    this.game.input.keyboard.onDownCallback = FirstResponder.keyDown;
  },

  update: function () {
    things.forEach(function (thing, index) {
      thing.update(game.time.time);
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
        player.walk(tileSize, 0);
        break;
      case Phaser.KeyCode.J:
      case Phaser.KeyCode.S:
      case Phaser.KeyCode.DOWN:
        player.walk(tileSize, 1);
        break;
      case Phaser.KeyCode.K:
      case Phaser.KeyCode.W:
      case Phaser.KeyCode.UP:
        player.walk(tileSize, 2);
        break;
      case Phaser.KeyCode.L:
      case Phaser.KeyCode.D:
      case Phaser.KeyCode.RIGHT:
        player.walk(tileSize, 3);
        break;
      case Phaser.KeyCode.Q:
        music.stop();
        var next_lvl = prompt("Jump to level");
        game.state.start('playing', true, false, next_lvl);
        break;
    }
  },

  creatureTriedToMove: function (creature, position) {
    var target;
    var landedOn = thingAtAbsPos(position, things);

    if (landedOn) {
      return landedOn.wasLandedOnBy(creature, game.time.time);
    } else {
      return false;
    }
  }
};

