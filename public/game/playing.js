var swipe, start_time, current_level_code, music, dialogue, map, sparkles, player, creatures, things, entities, lvlId, lvlData, gameInProgress;
var cutsceneInProgress = false;

function creatureDidDie(creature) {
  creatures.splice(creatures.indexOf(creature), 1);
  things.splice(things.indexOf(creature), 1);
  entities.splice(things.indexOf(creature), 1);
}

var playing = {
  init: function (lvl) {
    lvlId = lvl;
    swipe = new Swipe(game);
  },

  preload: function () {
  },

  create: function () {
    var tileset = game.cache.getText(lvlId + '_tiles');
    lvldata = JSON.parse(game.cache.getText(lvlId + '_data'));

    current_level_code = lvldata.level_code;

    gameInProgress = true;
    start_time = game.time.time;

    Audio.stopAll();
    Audio.playMusic(lvldata.music);
    Audio.playSound(lvlId + '_dialogue');

    setMessageText(lvldata.message);

    sparkles = [];

    map = MapGenerator.loadMap(tileset, lvldata, tileSize);
    creatures = CreatureGenerator.loadCreatures(lvldata.creatures, tileSize, FirstResponder.creatureTriedToMove);
    things = map.concat(creatures);
    entities = map.concat(creatures).concat(sparkles);

    player = creatures[lvldata.player];

    entities.forEach(function (entity, index) {
      entity.sprite = game.add.sprite(0, 0, entity.image); 
    });

    this.game.input.keyboard.onDownCallback = FirstResponder.keyDown;
  },

  update: function () {
    entities.forEach(function (entity, index) {
      entity.update(game.time.time);
    });
    
    var swipe_direction = swipe.check();

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

    if (swipe_direction !== null) {
      var swipeLeft  = swipe_direction.direction == swipe.DIRECTION_LEFT;
      var swipeDown  = swipe_direction.direction == swipe.DIRECTION_DOWN;
      var swipeUp    = swipe_direction.direction == swipe.DIRECTION_UP;
      var swipeRight = swipe_direction.direction == swipe.DIRECTION_RIGHT;
    } else {
      var swipeLeft, swipeDown, swipeUp, swipeRight;
    }

    var canMove = player.canMove(game.time.time) && !cutsceneInProgress;

    var goLeft  = keyH.isDown || keyA.isDown || keyLeft.isDown  || swipeLeft;
    var goDown  = keyJ.isDown || keyS.isDown || keyDown.isDown  || swipeDown;
    var goUp    = keyK.isDown || keyW.isDown || keyUp.isDown    || swipeUp;
    var goRight = keyL.isDown || keyD.isDown || keyRight.isDown || swipeRight;

    if (canMove) {
      if (goLeft) {
        player.walk(1, 0);
      } else if (goDown) {
        player.walk(1, 1);
      } else if (goUp) {
        player.walk(1, 2);
      } else if (goRight) {
        player.walk(1, 3);
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
        controlled_levelport(false);
        break;
    }
  },

  creatureTriedToMove: function (creature, position) {
    var target;
    var landedOn = thingAtPos(position, things);

    if (landedOn) {
      return landedOn.wasLandedOnBy(creature, game.time.time);
    } else {
      return false;
    }
  }
};

