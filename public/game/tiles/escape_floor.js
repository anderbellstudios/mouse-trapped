class EscapeFloorTile extends mix(FloorTile).with(GameEnder) {
  get cutscene() {
    return "end_two";
  }
}
