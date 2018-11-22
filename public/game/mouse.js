class Mouse extends Creature {
  get image() {
    return 'playerImage';
  }

  skin(time) {
    return 0;
  }

  cattable(time) {
    return true;
  }

  wasLandedOnBy(creature, time) {
    this.die(lvlId, "The cat got you! Try again...");
    return false;
  }

  postDie(next_level, message) {
    gtag('event', lvlId, {
      'event_category' : 'Mouse was killed'
    });

    Audio.playSound('mouse_died', this.position);
    Fade.toBlack(game, 1000, function () {
      Audio.stopAll();
      game.state.start('death', true, false, next_level, message);
    });
  }
}
