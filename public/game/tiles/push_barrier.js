class PushBarrierTile extends Tile {
  get image() {
    return 'barrierImage';
  }
  
  frame(time) {
    var automated_rotation;
    if (this.isOpen()) {
      automated_rotation = 1;
    } else {
      automated_rotation = 0;
    }

    var preset_rotation = this._frame;

    return (preset_rotation + automated_rotation) % 2;
  }

  wasLandedOnBy(player, time) {
    if (this.isOpen()) {
      return true;
    } else {
      this.state = true;
      return false;
    }
  }

  isOpen(time) {
    if (this.state === undefined) {
      this.state = this.data.state == "open";
    }

    return this.state;
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
}
