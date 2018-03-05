class HoleTile extends Tile {
  get image() {
    return 'holeImage';
  }

  wasLandedOnBy(player, time) {
    player.die(this.data.next_level, this.data.message);
    return true;
  }
}
