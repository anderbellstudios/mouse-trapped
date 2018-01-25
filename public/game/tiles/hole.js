class HoleTile extends Tile {
  get image() {
    return 'holeImage';
  }

  wasLandedOnBy(player, time) {
    fadeToLevel(this.data.next_level, this.data.message, "interlevel");
    return true;
  }
}
