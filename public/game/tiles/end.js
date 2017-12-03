class EndTile extends Tile {
  get image() {
    return 'endImage';
  }

  wasLandedOnBy(player, time) {
    game.state.start('playing', true, false, this.data.next_level);
    return true;
  }
}
