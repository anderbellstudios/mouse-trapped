class EscapeCheeseTile extends mix(CheeseTile).with(GameEnder) {
  get cutscene() {
    return "cutscenes/cheese";
  }

  get cutscene_frames() {
    return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
  }
}
