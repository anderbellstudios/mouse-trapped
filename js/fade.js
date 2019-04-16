var Fade = {
  toBlack: function (game, duration, callback) {
    var sprite = game.add.sprite(0, 0, 'blackImage');
    sprite.width = game.width;
    sprite.height = game.height;
    sprite.alpha = 0;

    var fadeTween = game.add.tween(sprite).to( { alpha: 1 }, duration, "Quart.easeOut" );
    fadeTween.onComplete.add(callback, true);
    fadeTween.start();
  }
}

