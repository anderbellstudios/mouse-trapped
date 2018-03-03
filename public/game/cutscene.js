var cutscene = function () {
  this.init = function (video, callback) {
    this.postCutsceneCallback = callback;
    this.video = video;
  }

  this.create = function () {
    this.video = game.add.video(this.video);
    this.videoSprite = this.video.addToWorld(0, 0);
    this.videoSprite.width = viewWidth;
    this.videoSprite.height = viewHeight;
    this.video.onComplete.add(this.postCutsceneCallback, true);
    this.video.play();
  }
}
