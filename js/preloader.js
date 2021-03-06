var loading_text;
var not_started = true;
var text_style = "4vw Arial";
var preloader = {
  preload: function() {
    game.load.spritesheet('teslaImage', 'images/tesla.png', 100, 100);
    game.load.spritesheet('boltImage', 'images/bolt.png', 30, 30);
    game.load.spritesheet('barrierImage', 'images/barrier.png', 100, 100);
    game.load.spritesheet('floorImage', 'images/floor.png', 100, 100);
    game.load.spritesheet('endImage', 'images/end.png', 100, 100);
    game.load.spritesheet('buttonImage', 'images/button.png', 100, 100);
    game.load.spritesheet('holeImage', 'images/hole.png', 100, 100);
    game.load.spritesheet('sparkleImage', 'images/sparkle.png', 100, 100);
    game.load.spritesheet('sensorImage', 'images/sensor.png', 100, 100);
    game.load.image('blackImage', 'images/black.png');
    game.load.image('menu_bg', 'images/menu_bg.png');
    game.load.image('death_bg', 'images/death_bg.png');
    game.load.spritesheet('playerImage', 'images/player.png', 100, 100);
    game.load.spritesheet('catImage', 'images/cat.png', 100, 100);
    game.load.spritesheet('skinSwitcherImage', 'images/skin_switcher.png', 100, 100);

    [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '0a', '0b', '0c', '0d', '0e', '0f', '10', '11', '12', '13', '14', '15', '16', 'fe', '1e', 'ff', '1f', '20' ].forEach(function (lvlId){
      game.load.text(lvlId + '_tiles', 'levels/' + lvlId + '.lvl');
      game.load.text(lvlId + '_data', 'levels/' + lvlId + '.json');
      game.load.audio(lvlId + '_dialogue', 'sounds/' + lvlId + '.wav');
    });

    [ 'play', 'quit', 'resume', 'tryAgain', ].forEach(function (button){
      game.load.spritesheet(button + "ButtonImage", 'images/buttons/' + button + '.png', buttonWidth, rowHeight);
    });
      
    game.load.audio('stay_optimistic', 'music/stay_optimistic.wav');
    game.load.audio('endless_maze', 'music/endless_maze.wav');
    game.load.audio('everyone_likes_cats', 'music/everyone_likes_cats.wav');
    game.load.audio('replaceable', 'music/replaceable.wav');
    game.load.audio('house_trapped', 'music/house_trapped.wav');

    game.load.audio('mouse_died', 'sounds/mouse_died.wav');
    game.load.audio('cat_died', 'sounds/cat_died.wav');
    game.load.audio('door_close', 'sounds/door_close.wav');

    var bg = game.add.sprite(0, 0, 'loading_bg'); 
    bg.width = viewWidth;
    bg.height = viewHeight;

    loading_text = game.add.text(game.world.centerX, game.world.centerY, 'Loading... ', { 
      font: text_style, 
      fill: "white", 
      align: "center" 
    });
    loading_text.anchor.set(0.5);

    this.load.onFileComplete.add(function(progress, cacheKey, success, totalLoaded, totalFiles) {
      loading_text.setText("Loading... " + progress + "%");
      if (progress == 100 && not_started) {

        var level_code = (new URL(window.location)).searchParams.get("lvl");
        var level = level_for(level_code);
        if (level) {
          fadeToLevel(level, "Levelporting...", "interlevel");
        } else {
          launch_menu('main_menu', main_menu);
        }

        not_started = false;
      }
    }, this);
  }
};
