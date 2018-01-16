class EndTile extends Tile {
  get image() {
    return 'endImage';
  }

  wasLandedOnBy(player, time) {
    var cutscene = this.data.cutscene;
    var cutscene_duration = this.data.cutscene_duration;
    var next_lvl = this.data.next_level;
    music.stop();
    $('#message').text("Well done!");
    Fade.toBlack(game, 1000, function () {
      game.state.start("cutscene", true, false, cutscene, cutscene_duration, function () {
        game.state.start('playing', true, false, next_lvl);
      });
    })
    return true;
  }
}
