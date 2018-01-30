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

    var keyH     = game.input.keyboard.addKey(Phaser.Keyboard.H);
    var keyA     = game.input.keyboard.addKey(Phaser.Keyboard.A);
    var keyLeft  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    var keyJ     = game.input.keyboard.addKey(Phaser.Keyboard.J);
    var keyS     = game.input.keyboard.addKey(Phaser.Keyboard.S);
    var keyDown  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    var keyK     = game.input.keyboard.addKey(Phaser.Keyboard.K);
    var keyW     = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var keyUp    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    var keyL     = game.input.keyboard.addKey(Phaser.Keyboard.L);
    var keyD     = game.input.keyboard.addKey(Phaser.Keyboard.D);
    var keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    var canMove = player.canMove(game.time.time) && !cutsceneInProgress;

    var goLeft  = keyH.isDown || keyA.isDown || keyLeft.isDown;
    var goDown  = keyJ.isDown || keyS.isDown || keyDown.isDown;
    var goUp    = keyK.isDown || keyW.isDown || keyUp.isDown;
    var goRight = keyL.isDown || keyD.isDown || keyRight.isDown;

    if (canMove) {
      if (goLeft) {
        player.walk(tileSize, 0);
      } else if (goDown) {
        player.walk(tileSize, 1);
      } else if (goUp) {
        player.walk(tileSize, 2);
      } else if (goRight) {
        player.walk(tileSize, 3);
      }
    }
  }
};


FirstResponder = {
  keyDown: function (keypress) {
    if (player.isMoving || cutsceneInProgress) {
      return false;
    }

    switch (keypress.keyCode) {
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

