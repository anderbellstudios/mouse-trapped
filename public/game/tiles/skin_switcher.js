class SkinSwitcherTile extends Tile {
  get image() {
    return 'skinSwitcherImage';
  }

  post_init() {
    var me = this;
    this.on_walk.push(function (walker, time) {
      me.switch_skin_on(walker, time);
    });
  }

  walkable(time) {
    return true;
  }

  get skin() {
    return this.data.skin;
  }

  switch_skin_on(walker, time) {
    user_settings.skin = this.skin;
  }

  skin_adjust(time) {
    // Duplicate function — see creature.js
    return ( this.skin || 0 ) * 4;
  }

  frame(time) {
    return this.default_frame + this.skin_adjust(time);
  }
}
