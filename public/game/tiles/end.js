class EndTile extends Tile {
  get image() {
    return 'endImage';
  }

  wasLandedOnBy(player, time) {
    var cutscene = this.data.cutscene;
    var next_lvl = this.data.next_level;
    music.stop();
    game.state.start('playing', true, false, next_lvl);
    return true;
  }
}
