class FloorTile extends Tile {
  get image() {
    return 'floorImage';
  }

  wasLandedOnBy(player, time) {
    return true;
  }
}
