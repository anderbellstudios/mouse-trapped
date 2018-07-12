class Tesla extends Creature {
  get image() {
    return 'holeImage';
  }

  update(time) {
    super.update(time);

    if ( this.shouldFire(time) ) {
      this.fire();
    }
  }

  fire() {
    var bolt = new Bolt( this.position, { "dx": -0.1, "dy": 0 } );
    bolt.create(game);
  }

  wasShot(time) {
    return true; // do not die
  }

  shouldFire(time) {
    if ( this.last_fired == undefined ) {
      this.last_fired = time;
      return true;
    }

    if ( this.last_fired + 2000 < time ) {
      this.last_fired = time; 
      return true;
    }

    return false;
  }
}

