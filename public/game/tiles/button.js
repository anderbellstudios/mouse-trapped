class ButtonTile extends Tile {
  get image() {
    return 'buttonImage';
  }

  wasLandedOnBy(player, time) {
    var target = this.data.target;
    map.forEach(function (tile, index) {
      if (tile.tileId == target) {
        tile.trigger();
      }
    });

    return true; 
  }
}
