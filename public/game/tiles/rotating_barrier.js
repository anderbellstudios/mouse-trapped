class RotatingBarrierTile extends Tile {
  get image() {
    return 'barrierImage';
  }

  frame(time) {
    var automated_rotation;
    if (this.isOpen(time)) {
      automated_rotation = 1;
    } else {
      automated_rotation = 0;
    }

    var preset_rotation = this._frame;

    return (preset_rotation + automated_rotation) % 2;
  }

  wasLandedOnBy(player, time) {
    return this.isOpen(time);
  }

  isOpen(time) {
    return (time + this.data.offset) % (this.data.delay * 2) < this.data.delay;
  }
}
