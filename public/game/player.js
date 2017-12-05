function Player(game, position, size, image, walkCallback) {
  this.sprite = game.add.sprite(position.x, position.y, image);
  this.sprite.width = size.width;
  this.sprite.height = size.height;

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
    this.sprite.x = position.x;
    this.sprite.y = position.y;
  }
}
