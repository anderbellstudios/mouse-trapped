class ButtonTile extends Tile {
  get image() {
    return 'buttonImage';
  }

  post_init() {
    var me = this;
    this.on_walk.push(function (walker, time) {
      me.activate_on_walk(walker, time);
    });
  }

  walkable(time) {
    return true;
  }

  activate_on_walk(walker, time) {
    var targets = this.data.targets;
    var action  = this.data.action;
    map.forEach(function (tile, index) {
      if (targets.includes(tile.tileId)) {
        tile.received_action(action);
      }
    });

    this.pressed_time = time;
  }

  frame(time) {
    return this.shouldBeHighlighted(time) ? 1 : 0;
  }
  
  shouldBeHighlighted(time) {
    if (this.pressed_time === undefined) {
      this.pressed_time = -505;
    }

    var relative_time = time - this.pressed_time;
    return relative_time > 50 && relative_time < 500;
  }
}
