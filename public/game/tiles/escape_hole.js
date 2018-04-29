class EscapeHoleTile extends mix(ToggledHoleTile).with(GameEnder) {
  get cutscene() {
    return "end_three";
  }

  end_game(time) {
    return this.isOpen(time);
  }
}
