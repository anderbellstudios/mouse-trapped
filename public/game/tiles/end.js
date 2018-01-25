class EndTile extends Tile {
  get image() {
    return 'endImage';
  }

  wasLandedOnBy(player, time) {
    fadeToLevel(this.data.next_level, "Well done!", "interlevel");
    return true;
  }
}
