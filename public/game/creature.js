class Creature {
  constructor(position, sprite, frame, walkCallback, data) {
    this.position = position;
    this.sprite = sprite;
    this._frame = frame;
    this.walkCallback = walkCallback;
    this.data = data;
    this.isMoving = false;
  }

  frame(time) {
    return this._frame;
  }

  update(time) {
    if (!this.isMoving) {
      this.sprite.x = this.position.x;
      this.sprite.y = this.position.y;
    }

    this.sprite.frame = this.frame(time);
  }

  die(next_level, message, cutscene) {
    this.sprite.destroy();
    creatureDidDie(this);
    this.postDie(next_level, message, cutscene);
  }

  postDie(next_level, message, cutscene) {
  }

  walk(distance, direction) {
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
    var walkTween = game.add.tween(this.sprite).to(position, 50, Phaser.Easing.Default, true);
    walkTween.onComplete.add(function() {
      this.isMoving = false;
      this.position = position;
    }, this);
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
