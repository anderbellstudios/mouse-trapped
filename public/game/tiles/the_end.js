class TheEndTile extends Tile {
  get image() {
    return 'endImage';
  }

  wasLandedOnBy(player, time) {
    gameInProgress = false;
    fadeToLevel(this.data.next_level, this.data.message, this.data.cutscene);
    return true;
  }

  get cattable() {
    return false;
  }
}
