var cutscene = function () {
  this.init = function (video, duration, callback) {
    this.postCutsceneCallback = callback;
    this.duration = duration;
    this.video = video;
  }

  this.preload = function () {
  }

  this.create = function () {
    game.stage.backgroundColor = "black";
    var vid = document.createElement('img');
    vid.width = viewWidth;
    vid.height = viewHeight;
    vid.id = "video-player";
    vid.src = 'videos/' + this.video + '.gif?id=' + (new Date()).getTime();

    var complete_callback = this.postCutsceneCallback;
    var duration = this.duration;
    var load_callback = function() {
      setTimeout(function() {
        vid.remove();
        complete_callback();
      }, duration);
    }

    $(vid).each(function(){
      if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
        load_callback.apply(this);
      }
      else {
        $(this).on('load', function(){
          load_callback.apply(this);
        });
      }
    });

    document.body.appendChild(vid);
  }
}
