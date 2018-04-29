class CheeseTile extends Tile {
  get image() {
    return 'endImage';
  }

  post_init() {
    var me = this;
    this.on_walk.push(function (walker, time) {
      me.levelport_on_walk(walker, time);
    });
  }

  levelport_on_walk(walker, time) {
    gtag('event', lvlId, {
      'event_category' : 'Level was finished'
    });

    gameInProgress = false;
    fadeToLevel(this.data.next_level, this.data.message, "interlevel");
  }

  walkable(time) {
    return true;
  }

  cattable(time) {
    return false;
  }
}
