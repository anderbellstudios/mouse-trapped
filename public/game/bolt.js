class Bolt {
  constructor(position, direction, owner) {
    this.position = position; 
    this.position = posAdd(this.position, { "dx": 0.35, "dy": 0.35 });
    this.direction = direction;
    this.owner = owner;
  }

  create(game) {
    this.sprite = game.add.sprite( 0, 0, 'boltImage' );
    var context = this;
    this.sprite.update = function() {
      context.update(game.time.time);
    };
  }

  update(time) {
    var time_dilation_factor = 60 * ( game.time.elapsedMS / 1000 );
    var velocity = {
      dx: time_dilation_factor * this.direction.dx,
      dy: time_dilation_factor * this.direction.dy
    };

    this.position = posAdd(this.position, velocity);

    this.sprite.x = this.absPos.x;
    this.sprite.y = this.absPos.y;
    this.sprite.width = tileSize / 5;
    this.sprite.height = tileSize / 5;

    var target = thingAtPos( this.nearestPosition, entities );
    if ( target !== undefined  && target.id !== this.owner ) {
      var still_going = target.wasShot(time);
      if ( !still_going ) {
        this.sprite.destroy();
      }
    }

    if ( this.offScreen ) {
      this.sprite.destroy();
    }
  }

  get nearestPosition() {
    return {
      "x": Math.round(this.position.x - 0.5),
      "y": Math.round(this.position.y - 0.5)
    }
  }

  get absPos() {
    return absPosfor( this.position );
  }

  get offScreen() {
    return this.offScreenX || this.offScreenY;
  }

  get offScreenX() {
    return this.position.x < 0 || this.position.x > gridWidth;
  }

  get offScreenY() {
    return this.position.y < 0 || this.position.y > gridHeight;
  }
}
