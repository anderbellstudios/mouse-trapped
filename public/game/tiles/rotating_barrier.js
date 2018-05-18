class RotatingBarrierTile extends BarrierTile {
  isOpen(time) {
    return ( time + this.data.offset ) % (this.data.closed + this.data.open) > this.data.closed;
  }
}
