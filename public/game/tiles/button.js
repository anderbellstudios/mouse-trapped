class ButtonTile extends Tile {
  get image() {
    return 'buttonImage';
  }

  wasLandedOnBy(player, time) {
    var targets = this.data.targets;
    var action  = this.data.action;
    map.forEach(function (tile, index) {
      if (targets.includes(tile.tileId)) {
        tile.received_action(action);
      }
    });

    return true; 
  }
}
