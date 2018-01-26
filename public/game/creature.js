class Creature {
  constructor(position, sprite, frame, walkCallback) {
    this.position = position;
    this.sprite = sprite;
    this._frame = frame;
    this.walkCallback = walkCallback;
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

  walk(distance, direction) {
    this._frame = direction;
    var translation = this.translationFor(distance, direction);

    var new_position = {
      x: this.position.x + translation.dx,
      y: this.position.y + translation.dy
    }

    if ( this.walkCallback(this, new_position) ) {
      this.moveTo(new_position);
    }
  }

  moveTo(position) {
    this.isMoving = true;
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
}
