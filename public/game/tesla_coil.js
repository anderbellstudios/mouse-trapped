class TeslaCoil extends Creature {
  get image() {
    return 'teslaImage';
  }

  frame(time) {
    var shift = 0;
    if ( this.timeUntilFire(time) < 250 ) {
      shift = 4;
    } else if ( this.timeUntilFire(time) < 500 ) {
      shift = 2;
    }

    return this.base_frame(time) + shift;
  }

  update(time) {
    super.update(time);

    this.sprite.rotation = this.angle;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.sprite.position = absPosfor( posAdd( this.position, { "dx": 0.5, "dy": 0.5 } ) );

    if ( this.shouldFire(time) ) {
      this.fire();
    }
  }

  fire() {
    var bolt = new Bolt( this.position, this.boltVector );
    bolt.create(game);
  }

  wasShot(time) {
    return true; // do not die
  }

  get boltVector() {
    var speed = this.data.bolt_speed - 0;
    return { "dx": Math.cos(this.angle) * speed, "dy": Math.sin(this.angle) * speed };
  }

  shouldFire(time) {
    if ( this.timeUntilFire(time) < 0 ) {
      this.last_fired = time; 
      return true;
    }

    return false;
  }

  timeUntilFire(time) {
    if ( this.last_fired == undefined ) {
      this.last_fired = time;
    }

    return this.last_fired + ( this.data.rate - 0 ) - time;
  }
}

