var buttons, titlePath;

var menu = {
  init: function (_titlePath, _buttons) {
    titlePath = _titlePath;
    buttons = _buttons;
  },

  preload: function () {
    game.load.image('title', 'images/menu_titles/' + titlePath + '.png', titleWidth, rowHeight);
  },

  create: function () {
    var bg = game.add.sprite(0, 0, 'menu_bg'); 
    bg.width = viewWidth;
    bg.height = viewHeight;

    var button_count = buttons.length;

    var row_count = 1 + button_count;
    var spacing = viewHeight / ( row_count + 1 );
    var verticalPosition = i => spacing * (i + 1);

    var scaleFactor = spacing * 0.6 / rowHeight;

    var title = game.add.sprite(game.world.centerX, verticalPosition(0), 'title');
    title.anchor.setTo(0.5, 0.5);
    title.scale.setTo(scaleFactor * 1.5);

    var button, element;
    for (var i = 0; i < button_count; i++) {
      button = buttons[i];
      element = game.add.button(game.world.centerX, verticalPosition(i + 1), button.name + "ButtonImage", button.onclick, this, 1, 0, 2, 0);
      element.anchor.setTo(0.5, 0.5);
      element.scale.setTo(scaleFactor);
    }
  }
};
