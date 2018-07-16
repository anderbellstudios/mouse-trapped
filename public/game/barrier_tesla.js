class BarrierTesla extends TeslaCoil {
  base_frame(time) {
    return 0;
  }

  get angle() {
    switch(this.data.direction) {
      case 0:
        return Math.PI;
      case 1:
        return Math.PI * 0.5;
      case 2:
        return Math.PI * -0.5;
      case 3:
        return 0;
      default:
        alert("invalid direction: " + this.data.direction);
        break;
    }
  }
}
