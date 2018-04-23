class DimensionFloorTile extends Tile {
  get image() {
    return 'floorImage';
  }

  frame(time) {
    return 1;
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
