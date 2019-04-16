var Audio = {
  sounds: [],

  playMusic: function(key) {
    this.play(key, 0.2, true, null);
  },

  playSound: function(key, emitter) {
    this.play(key, 0.8, false, emitter);
  },

  play: function(key, volume, repeat, emitter) {
    var sound = game.add.sound(key, volume, repeat);
    sound.play();
    sound.emitter = emitter;
    sound.base_volume = volume;
    this.sounds.push(sound);
    this.update();
  },

  update: function () {
    for (var i = 0, len = this.sounds.length; i < len; i++) {
      var sound = this.sounds[i];

      if ( sound.emitter ) {
        var distance = distanceBetween( sound.emitter, player.position );
        var dampening = 5;
        var rel_volume = Math.pow( dampening, 2 ) * Math.pow( distance + dampening, -2 );
        sound.volume = sound.base_volume * rel_volume;
      }

      if (sound.loop) {
        sound.mute = !user_settings.music_enabled;
      } else {
        sound.mute = !user_settings.sounds_enabled;
      }
    }
  },

  stopAll: function () {
    for (var i = 0, len = this.sounds.length; i < len; i++) {
      this.sounds[i].stop();
    }
  }
};
