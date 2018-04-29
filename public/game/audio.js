var Audio = {
  sounds: [],

  playMusic: function(key) {
    if (user_settings.music_enabled) {
      this.play(key, 0.2, true);
    }
  },

  playSound: function(key) {
    if (user_settings.sounds_enabled) {
      this.play(key, 0.8, false);
    }
  },

  play: function(key, volume, repeat) {
    var sound = game.add.sound(key, volume, repeat);
    sound.play();
    this.sounds.push(sound);
  },

  stopAll: function () {
    for (var i = 0, len = this.sounds.length; i < len; i++) {
      this.sounds[i].stop();
    }
  }
};
