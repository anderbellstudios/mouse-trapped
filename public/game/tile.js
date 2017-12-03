class Tile {
  constructor(position, frame, tileId, data) {
    this.position = position;
    this._frame = frame;
    this.tileId = tileId;
    this.data = data;
  }

  frame(time) {
    return this._frame;
  }

  wasLandedOnBy(player, time) {
    return false;
  }
}
