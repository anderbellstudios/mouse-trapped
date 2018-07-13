class Tesla extends Creature {
  get image() {
    return 'holeImage';
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
    if ( this.last_fired == undefined ) {
      this.last_fired = time;
      return true;
    }

    if ( this.last_fired + ( this.data.rate - 0 ) < time ) {
      this.last_fired = time; 
      return true;
    }

    return false;
  }
}

