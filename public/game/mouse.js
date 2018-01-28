class Mouse extends Creature {
  get image() {
    return 'playerImage';
  }

  wasLandedOnBy(creature, time) {
    this.die(lvlId, "The cat got you! Try again...", "interlevel");
    return false;
  }

  postDie(next_level, message, cutscene) {
    fadeToLevel(next_level, message, cutscene);
  }
}
