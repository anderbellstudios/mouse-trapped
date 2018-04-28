class EndTile extends Tile {
  get image() {
    return 'endImage';
  }

  wasLandedOnBy(player, time) {
    gtag('event', lvlId, {
      'event_category' : 'Level was finished'
    });

    gameInProgress = false;
    fadeToLevel(this.data.next_level, "Level code: '" + current_level_code + "'", "interlevel");
    return true;
  }

  get cattable() {
    return false;
  }
}
