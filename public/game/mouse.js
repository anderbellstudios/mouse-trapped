class Mouse extends Creature {
  get image() {
    return 'playerImage';
  }

  cattable(time) {
    return true;
  }

  get skin() {
    return user_settings.skin;
  }

  wasLandedOnBy(creature, time) {
    this.die(lvlId, "The cat got you! Try again...");
    return false;
  }

  postDie(next_level, message) {
    Audio.playSound('mouse_died', this.position);
    Fade.toBlack(game, 1000, function () {
      Audio.stopAll();
      game.state.start('death', true, false, next_level, message);
    });
  }
}
