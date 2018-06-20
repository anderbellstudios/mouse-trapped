let GameEnder = (superclass) => class extends superclass {
  post_init() {
    var me = this;
    this.on_walk.push(function (walker, time) {
      me.end_game_on_walk(walker, time);
    });
  }

  end_game_on_walk(walker, time) {
    if (this.end_game(time)) {
      Audio.stopAll();
      cutsceneInProgress = true;
      setMessageText("");
      var cutscene = this.cutscene;
      var cutscene_frames = this.cutscene_frames;
      Fade.toBlack(game, 1000, function () {
        game.state.start("cutscene", true, false, cutscene, cutscene_frames, function () {
          cutsceneInProgress = false;
          launch_menu('main_menu', main_menu);
          var destination = '/gameover';
          if (window.open(destination) === null) {
            window.location = destination; 
          }
        });
      });
    }
  }

  get cutscene() {
    alert("All game enders must specify a cutscene.");
  }

  get cutscene_frames() {
    alert("All game enders must specify cutscene frames.");
  }

  end_game(time) {
    return true;
  }

  cattable(time) {
    return !end_game(time);
  }
}
