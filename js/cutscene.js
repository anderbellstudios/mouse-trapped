var cutscene = function () {
  this.init = function (path, frames, callback) {
    this.postCutsceneCallback = callback;
    this.path = path;
    this.frames = frames;
  }

  this.preload = function () {
    game.load.text('meta', this.path + '/meta.json');
    for (var i = 0, len = this.frames.length; i < len; i++) {
      game.load.text('frame_' + this.frames[i], this.path + '/' + this.frames[i]);
    }
  }

  this.create = function () {
    this.metaData = JSON.parse(game.cache.getText('meta'));
    this.next_transition = game.time.time - 1;
  }

  this.update = function () {
    if (game.time.time > this.next_transition) {
      if (this.metaData.length == 0) {
        $('#cutscene-container').hide();
        this.postCutsceneCallback();
      } else {
        var text = game.cache.getText('frame_' + this.metaData[0].frame);

        var lines = text.split('\n');
        var table = $('#cutscene-container > table > tbody');
        for (var i = 0; i < 24; i++) {
          var chars = lines[i].split('');
          var row = $(table.children()[i]);
          for (var j = 0; j < 64; j++) {
            var symbol = chars[j];
            if (symbol == "~") {
              symbol = "&nbsp;";
            }
            var cell = $(row.children()[j]);
            cell.html(symbol);
          }
        }

        $('#cutscene-container').show();

        this.next_transition += this.metaData[0].duration;
        this.metaData.shift();
      }
    }
  }
}
