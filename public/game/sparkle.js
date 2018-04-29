class Sparkle {
  constructor(position, data) {
    this.position = position;
    this.data = data;
  }

  get image() {
    return "sparkleImage";
  }

  frame(time) {
    var phase = ( time + this.phaseOffset() ) % this.data.frequency;
    if ( phase < this.data.duration / 2) {
      return 2;
    } else if ( phase < this.data.duration ) {
      return 1;
    } else {
      return 0;
    }
  }

  phaseOffset() {
    if ( this.data.offset == -1 ) {
      if ( this._randOffset === undefined ) {
        this._randOffset = Math.random() * this.data.frequency;
      }
      return this._randOffset;
    } else {
      return this.data.offset;
    }
  }
  
  update(time) {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.frame = this.frame(time);
  }

  wasLandedOnBy(creature, time) {
    return true;
  }

  cattable(time) {
    return true;
  }
}
