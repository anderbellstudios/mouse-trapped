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

    Audio.playSound('mouse_died');
    Fade.toBlack(game, 1000, function () {
      Audio.stopAll();
      game.state.start('death', true, false, next_level, message);
    });
  }
}
