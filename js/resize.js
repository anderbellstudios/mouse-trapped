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

  $('#cutscene-container > table').width(viewWidth);
  $('#cutscene-container > table').height(viewHeight);
  $('#cutscene-container').css('transform', 'translateY(-' + viewHeight + 'px)');

  var size;
  var lower = 0;
  var higher = 100;
  for (var i = 0; i < 10; i++) {
    size = lower + ( (higher - lower) / 2);
    $('#cutscene-container > table').css('font-size', size);
    if ( $('#cutscene-container').width() > viewWidth ) {
      higher = size;
    } else {
      lower = size;
    }
  }
  $('#cutscene-container > table').css('font-size', lower);

  $('#message').width(viewWidth - 30);
  $('#message').css('left', (window.innerWidth - viewWidth) / 2 + 15);
  $('#cutscene-container').css('left', (window.innerWidth - viewWidth) / 2);

  text_height = $('#message').height();
  $('#message').css('transform', 'translateY(-' + (text_height + 15) + 'px)');

  offset = (oldWidth - viewWidth) / 2;
  $('#game-container').css('transform', 'translateX(' + offset + 'px)');

  $('#game-buttons').css('height', viewHeight);
  $('.arrow-button').css('width', tileSize * 2);
  $('.arrow-button').css('height', tileSize * 2);

  if (game) {
    game.scale.setGameSize(viewWidth, viewHeight);
  }

  return [viewWidth, viewHeight];
}
