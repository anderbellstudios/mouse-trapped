class BarrierTile extends Tile {
  get image() {
    return 'barrierImage';
  }

  get default_state() {
    return this.data.state == "open";
  }
  
  frame(time) {
    if ( this.isOpen(time) !== this.was_open && this.was_open !== undefined) {
      Audio.playSound('door_close');
    }
    this.was_open = this.isOpen(time);

    if (this.default_frame <= 1) {
      var rotation = this.isOpen(time) ? 1 : 0;
      return (this.default_frame + rotation) % 2;
    } else {
      return this.default_frame;
    }
  }

  walkable(time) {
    return this.isOpen(time);
  }

  isOpen(time) {
    return false;
  }
}
