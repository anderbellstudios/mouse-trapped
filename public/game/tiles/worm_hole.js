class WormHoleTile extends Tile {
  get image() {
    return 'holeImage';
  }

  frame(time) {
    if (this.isOpen(time)) {
      return 0;
    } else {
      return 1;
    }
  }

  isOpen(time) {
    if (this.state === undefined) {
      this.state = this.data.state == "open";
    }

    return this.state;
  }

  wasLandedOnBy(player, time) {
    if (this.isOpen(time)) {
      gameInProgress = false;
      fadeToLevel(this.data.next_level, this.data.message, this.data.cutscene);
    } 

    return true;
  }

  received_action(action) {
    switch (action) {
      case 'toggle':
        this.state = !this.state;
        break;
      case 'pullOpen':
        this.state = true;
        break;
      case 'pullClosed':
        this.state = false;
        break;
    }
  }

  get cattable() {
    return false;
  }
}
