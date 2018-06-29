var Audio = {
  sounds: [],

  playMusic: function(key) {
    this.play(key, 0.2, true);
  },

  playSound: function(key) {
    this.play(key, 0.8, false);
  },

  play: function(key, volume, repeat) {
    var sound = game.add.sound(key, volume, repeat);
    sound.play();
    this.sounds.push(sound);
    this.update();
  },

  update: function () {
    for (var i = 0, len = this.sounds.length; i < len; i++) {
      var sound = this.sounds[i];

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
