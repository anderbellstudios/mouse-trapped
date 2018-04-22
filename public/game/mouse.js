class Mouse extends Creature {
  get image() {
    return 'playerImage';
  }

  wasLandedOnBy(creature, time) {
    this.die(lvlId, "The cat got you! Try again...");
    return false;
  }

  postDie(next_level, message) {
    if (music != undefined) {
      music.stop();
    }
    if (dialogue != undefined) {
      dialogue.stop();
    }
    Fade.toBlack(game, 1000, function () {
      game.state.start('death', true, false, next_level, message);
    });
  }
}
