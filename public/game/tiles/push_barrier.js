class PushBarrierTile extends ToggledBarrierTile {
  post_init() {
    var me = this;
    this.on_walk.push(function (walker, time) {
      me.unlock_on_walk(walker, time);
    });
  }

  unlock_on_walk(walker, time) {
    this.received_action('pullOpen');
  }

  cattable(time) {
    return true;
  }
}
