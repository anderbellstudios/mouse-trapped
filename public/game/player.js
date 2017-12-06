function Player(game, position, size, image, walkCallback) {
  this.sprite = game.add.sprite(position.x, position.y, image);
  this.sprite.width = size.width;
  this.sprite.height = size.height;

  this.isMoving = false;
  this.walkSucceeded = walkCallback;

  this.position = function () {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    }
  }

  this.walk = function (translation) {
    var new_position = {
      x: this.position().x + translation.dx,
      y: this.position().y + translation.dy
    }

    if ( this.walkSucceeded(this, new_position) ) {
      this.moveTo(new_position);
    }
  }

  this.setFrame = function (frame) {
    this.sprite.frame = frame;
  }

  this.moveTo = function (position) {
    this.isMoving = true;
    var walkTween = game.add.tween(this.sprite).to(position, 50, Phaser.Easing.Default, true);
    walkTween.onComplete.add(this.finishMove, this);
  }

  this.finishMove = function() {
    this.isMoving = false;
  }
}
