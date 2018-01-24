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
    game.load.image('blackImage', '/images/black.png');
    game.load.spritesheet('playerImage', '/images/player.png', 100, 100);
    game.load.video('video', 'https://doc-08-6o-docs.googleusercontent.com/docs/securesc/k4kgijrcjv9gje5ibue5ggjh5vshfp94/60j1hqssbkhak8lud0cue9m8ij6loe63/1516780800000/17879090549451632696/17879090549451632696/1rFIG_a7dEL3xPOiuPqSjAGQw1aV6pwQ0?nonce=l2ovrc9a2fcfo&user=17879090549451632696&hash=62mf7mpq2kk1e7fvsnh1i7mn7bsgc5vm');

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
