var start_time, levelIsResumable, current_level_code, music, dialogue, map, sparkles, player, creatures, things, entities, lvlId, lvlData, gameInProgress;
var cutsceneInProgress = false;

function creatureDidDie(creature) {
  creatures.splice(creatures.indexOf(creature), 1);
  things.splice(things.indexOf(creature), 1);
  entities.splice(entities.indexOf(creature), 1);
}

var playing = {
  init: function (lvl) {
    lvlId = lvl;
  },

  preload: function () {
  },

  create: function () {
    var tileset = game.cache.getText(lvlId + '_tiles');
    lvldata = JSON.parse(game.cache.getText(lvlId + '_data'));

    current_level_code = lvldata.code;
    levelIsResumable = lvldata.resumable;

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

    if ( player.canMove(game.time.time) && !cutsceneInProgress ) {
      if ( Controls.left() ) {
        player.walk(1, 0);
      } else if ( Controls.down() ) {
        player.walk(1, 1);
      } else if ( Controls.up() ) {
        player.walk(1, 2);
      } else if ( Controls.right() ) {
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
        display_levelport(false);
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

