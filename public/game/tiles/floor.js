class FloorTile extends Tile {
  get image() {
    return 'floorImage';
  }

  walkable(time) {
    return true;
  }
}
