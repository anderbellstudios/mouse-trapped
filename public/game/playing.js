var music, map, sparkles, player, creatures, things, entities, lvlId, lvlData, gameInProgress;
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

    if (music != undefined) {
      music.stop();
    }

    if (user_settings.music_enabled) {
      music = game.add.sound(lvldata.music, 1, true);
      music.play();
    }

    $('#message').text(lvldata.message);

    sparkles = [];

    map = MapGenerator.loadMap(tileset, lvldata, tileSize);
    creatures = CreatureGenerator.loadCreatures(lvldata.creatures, tileSize, FirstResponder.creatureTriedToMove);
    things = map.concat(creatures);
    entities = map.concat(creatures).concat(sparkles);

    player = creatures[lvldata.player];

    entities.forEach(function (entity, index) {
      entity.sprite = game.add.sprite(0, 0, entity.image); 
      entity.sprite.width = tileSize;
      entity.sprite.height = tileSize;
    });

    this.game.input.keyboard.onDownCallback = FirstResponder.keyDown;
  },

  update: function () {
    entities.forEach(function (entity, index) {
      entity.update(game.time.time);
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
        var level_code = prompt("Enter your level code here...");
        var level = level_for(level_code);
        if (level) {
          if (music != undefined) {
            music.stop();
          }
          game.state.start('playing', true, false, level);
        } else {
          alert("Code invalid. Is this an invitation code?");
        }
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

function level_for(code) {
  var result = $.ajax({
    type: "GET",
    url: '/level_code/' + code,
    async: false
  }).responseText.replace(/\n|\r/g,'');

  if (result == 'invalid') { 
    return false;
  } else {
    return result;
  }
}
