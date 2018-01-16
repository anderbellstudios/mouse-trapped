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

    this.pressedTime = time;

    return true; 
  }

  frame(time) {
    if ( this.shouldBeHighlighted(time) ) {
      return 1;
    } else {
      return 0;
    }
  }
  
  shouldBeHighlighted(time) {
    if (this.pressedTime === undefined) {
      this.pressedTime = -505;
    }

    var relative_time = time - this.pressedTime;
    return relative_time > 50 && relative_time < 500;
  }
}
