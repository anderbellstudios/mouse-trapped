var loading_text;
var not_started = true;
var preloader = {
  preload: function() {
    game.load.audio('learning_mouse', '/music/learning_mouse.wav');
    game.load.audio('endless_maze', '/music/endless_maze.wav');
    game.load.spritesheet('barrierImage', '/images/barrier.png', 100, 100);
    game.load.spritesheet('floorImage', '/images/floor.png', 100, 100);
    game.load.spritesheet('endImage', '/images/end.png', 100, 100);
    game.load.spritesheet('buttonImage', '/images/button.png', 100, 100);
    game.load.spritesheet('holeImage', '/images/hole.png', 100, 100);
    game.load.image('blackImage', '/images/black.png');
    game.load.spritesheet('playerImage', '/images/player.png', 100, 100);
    game.load.video('video', 'https://dl.dropboxusercontent.com/s/ktff4uaosmenc94/interlevel.mp4');

    loading_text = game.add.text(game.world.centerX, game.world.centerY, 'Loading... ', { 
      font: "40pt Arial", 
      fill: "grey", 
      align: "center" 
    });
    loading_text.anchor.set(0.5);

    game.stage.backgroundColor = '#D7D5D7';

    this.load.onFileComplete.add(function(progress, cacheKey, success, totalLoaded, totalFiles) {
      loading_text.setText("Loading... " + progress + "%");
      if (progress == 100 && not_started) {
        game.state.start('menu', true, false, 'main_menu', main_menu);
        not_started = false;
      }
    }, this);
  }
};
