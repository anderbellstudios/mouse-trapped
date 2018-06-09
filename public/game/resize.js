function resize(game) {
  gridWidth = 16;
  gridHeight = 12;

  oldWidth = $('#game-container').width();

  idealWidth = window.innerWidth * 0.95;
  idealHeight = window.innerHeight * 0.95;

  viewWidth = Math.floor(idealWidth);
  viewHeight = Math.floor(3 * viewWidth / 4);

  if (viewHeight > idealHeight) {
    viewHeight = Math.floor(idealHeight);
    viewWidth = Math.floor(4 * viewHeight / 3);
  }

  tileSize = Math.floor(viewWidth / gridWidth);

  viewWidth = Math.floor(tileSize * gridWidth);
  viewHeight = Math.floor(tileSize * gridHeight);

  $('#message').width(viewWidth - 30);
  $('#message').css('left', (window.innerWidth - viewWidth) / 2 + 15);

  text_height = $('#message').height();
  $('#message').css('transform', 'translateY(-' + (text_height + 15) + 'px)');

  offset = (oldWidth - viewWidth) / 2;
  $('#game-container').css('transform', 'translateX(' + offset + 'px)');

  if (game) {
    game.scale.setGameSize(viewWidth, viewHeight);
  }

  return [viewWidth, viewHeight];
}
