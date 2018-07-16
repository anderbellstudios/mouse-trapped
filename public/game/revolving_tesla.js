class RevolvingTesla extends TeslaCoil {
  base_frame(time) {
    return 1;
  }

  get angle() {
    return ( Math.PI / 2 ) - Math.atan2( 
      player.position.x - this.position.x, 
      player.position.y - this.position.y);  
  }
}
