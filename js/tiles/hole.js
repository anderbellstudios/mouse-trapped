class HoleTile extends Tile {
  get image() {
    return 'holeImage';
  }

  post_init() {
    var me = this;
    this.on_walk.push(function (walker, time) {
      me.die_on_walk(walker, time);
    });
  }

  die_on_walk(walker, time) {
  	if (this.deadly(time)) {
	  walker.die(this.data.next_level, this.data.message);
  	}
  }

  deadly(time) {
    return this.isOpen(time);
  }

  get default_state() {
    return this.data.state == "open";
  }

  frame(time) {
    return this.isOpen(time) ? 0 : 1;
  }

  walkable(time) {
    return true;
  }

  isOpen(time) {
  	return true;
  }
}
