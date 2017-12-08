class ButtonTile extends Tile {
  get image() {
    return 'buttonImage';
  }

  wasLandedOnBy(player, time) {
    var targets = this.data.targets;
    map.forEach(function (tile, index) {
      if (targets.includes(tile.tileId)) {
        tile.trigger();
      }
    });

    return true; 
  }
}
