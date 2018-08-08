class SensorTile extends Tile { 
  get image() {
    return 'sensorImage';
  }

  frame(time) {
    return this.active(time) - 0;
  }

  walkable(time) {
    return false;
  }

  wasShot(time) {
    this.last_shot = time;
    return false;
  }

  postUpdate(time) {
    if ( this.last_state !== this.active(time) ) {
      switch( this.active(time) ) {
        case true:
          this.send_action( this.data.activate );
          break;
        case false:
          this.send_action( this.data.deactivate );
          break;
      }
      this.last_state = this.active(time);
    }
  }

  active(time) {
    if (this.last_shot == undefined) {
      return false;
    }

    return time - this.last_shot < ( this.data.frequency + 50 );
  }
}
