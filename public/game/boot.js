var boot = {
  preload: function() {
    game.load.image('loading_bg', '/images/loading_bg.png');
  },

  create: function() {
    game.state.start('preloader');
  }
};
