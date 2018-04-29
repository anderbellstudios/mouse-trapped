class Mouse extends Creature {
  get image() {
    return 'playerImage';
  }

  wasLandedOnBy(creature, time) {
    this.die(lvlId, "The cat got you! Try again...");
    return false;
  }

  postDie(next_level, message) {
    gtag('event', lvlId, {
      'event_category' : 'Mouse was killed'
    });

    Audio.stopAll();
    Fade.toBlack(game, 1000, function () {
      game.state.start('death', true, false, next_level, message);
    });
  }
}
