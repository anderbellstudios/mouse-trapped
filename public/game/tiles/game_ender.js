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
      Fade.toBlack(game, 1000, function () {
        game.state.start("cutscene", true, false, cutscene, function () {
          cutsceneInProgress = false;
          launch_menu('main_menu', main_menu);
        });
      });
    }
  }

  get cutscene() {
    alert("All game enders must specify a cutscene.");
  }

  end_game(time) {
    return true;
  }

  cattable(time) {
    return !end_game(time);
  }
}
