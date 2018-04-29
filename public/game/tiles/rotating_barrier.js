class RotatingBarrierTile extends BarrierTile {
  isOpen(time) {
    return (time + this.data.offset) % (this.data.delay * 2) < this.data.delay;
  }
}
