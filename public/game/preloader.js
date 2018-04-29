var loading_text;
var not_started = true;
var preloader = {
  preload: function() {
    game.load.audio('stay_optimistic', '/music/stay_optimistic.wav');
    game.load.audio('endless_maze', '/music/endless_maze.wav');
    game.load.audio('everyone_likes_cats', '/music/everyone_likes_cats.wav');
    game.load.audio('replaceable', '/music/replaceable.wav');
    game.load.video('interlevel', '/videos/interlevel.mp4');
    game.load.video('end_one', '/videos/end_one.mp4');
    game.load.video('end_two', '/videos/end_two.mp4');
    game.load.video('end_three', '/videos/end_three.mp4');
    game.load.spritesheet('barrierImage', '/images/barrier.png', 100, 100);
    game.load.spritesheet('floorImage', '/images/floor.png', 100, 100);
    game.load.spritesheet('endImage', '/images/end.png', 100, 100);
    game.load.spritesheet('buttonImage', '/images/button.png', 100, 100);
    game.load.spritesheet('holeImage', '/images/hole.png', 100, 100);
    game.load.spritesheet('sparkleImage', 'images/sparkle.png', 100, 100);
    game.load.spritesheet('tryAgainButtonImage', 'images/buttons/try_again.png', 600, 225);
    game.load.spritesheet('quitButtonImage', 'images/buttons/quit.png', 600, 225);
    game.load.image('blackImage', '/images/black.png');
    game.load.image('menu_bg', '/images/menu_bg.png');
    game.load.image('death_bg', '/images/death_bg.png');
    game.load.spritesheet('playerImage', '/images/player.png', 100, 100);
    game.load.spritesheet('catImage', '/images/cat.png', 100, 100);

    [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '0a', '0b', '1e', 'ff', '1f', '20' ].forEach(function (lvlId){
      game.load.text(lvlId + '_tiles', '/levels/' + lvlId + '.lvl');
      game.load.text(lvlId + '_data', '/levels/' + lvlId + '.json');
      game.load.audio(lvlId + '_dialogue', '/sounds/' + lvlId + '.wav');
    });

    var bg = game.add.sprite(0, 0, 'loading_bg'); 
    bg.width = viewWidth;
    bg.height = viewHeight;

    loading_text = game.add.text(game.world.centerX, game.world.centerY, 'Loading... ', { 
      font: "40pt Arial", 
      fill: "white", 
      align: "center" 
    });
    loading_text.anchor.set(0.5);

    this.load.onFileComplete.add(function(progress, cacheKey, success, totalLoaded, totalFiles) {
      loading_text.setText("Loading... " + progress + "%");
      if (progress == 100 && not_started) {
        launch_menu('main_menu', main_menu);
        not_started = false;
      }
    }, this);
  }
};
