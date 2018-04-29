class EscapeCheeseTile extends mix(CheeseTile).with(GameEnder) {
  get cutscene() {
    return "end_one";
  }
}
