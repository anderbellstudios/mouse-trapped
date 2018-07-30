class Creature {
  constructor(position, sprite, frame, walkCallback, data) {
    this.position = position;
    this.sprite = sprite;
    this._frame = frame;
    this.walkCallback = walkCallback;
    this.data = data;
    this.isMoving = false;
    this.lastMoved = -1000; 
    this.is_dead = false;
  }

  cattable(time) {
    return false;
  }

  frame(time) {
    return this._frame;
  }

  update(time) {
    if (!this.isMoving) {
      this.sprite.x = absPosfor(this.position).x;
      this.sprite.y = absPosfor(this.position).y;
      this.sprite.width = tileSize;
      this.sprite.height = tileSize;
    }

    this.sprite.frame = this.frame(time);
  }

  wasShot(time) {
    this.die(lvlId, "You were shot by the Tesla coil.");
    return false; 
  }

  die(next_level, message) {
    this.is_dead = true;
    this.sprite.destroy();
    creatureDidDie(this);
    this.postDie(next_level, message);
  }

  postDie(next_level, message) {
  }

  walk(distance, direction) {
    if (this.is_dead) {
      return false;
    }

    var translation = this.translationFor(distance, direction);

    var new_position = posAdd(this.position, translation);

    if ( this.walkCallback(this, new_position) ) {
      this.moveTo(new_position);
    }
  }

  moveTo(position) {
    this.isMoving = true;
    var angle = angleBetween(this.position, position);
    if (angle < 0) {
      this._frame = 2;
    } else if (angle < 90) {
      this._frame = 3;
    } else if (angle < 180) {
      this._frame = 1;
    } else if (angle < 270) {
      this._frame = 0;
    } 
    var walkTween = game.add.tween(this.sprite).to(absPosfor(position), 50, Phaser.Easing.Default, true);
    walkTween.onComplete.add(function() {
      this.isMoving = false;
      this.lastMoved = game.time.time;
      this.position = position;
    }, this);
  }

  canMove(time) {
    return !this.isMoving && ( time - this.lastMoved > 100 );
  }

  translationFor(distance, direction) {
    switch (direction) {
      case 0:
        return { dx: -distance, dy: 0 };
      case 1:
        return { dx: 0, dy: distance };
      case 2:
        return { dx: 0, dy: -distance };
      case 3:
        return { dx: distance, dy: 0 };
    }
  }

  wasLandedOnBy(creature, time) {
    return false;
  }
}
