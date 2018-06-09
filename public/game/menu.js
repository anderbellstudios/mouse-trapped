var buttons, titlePath, buttonElements, title, menuBg;

var menu = {
  init: function (_titlePath, _buttons) {
    titlePath = _titlePath;
    buttons = _buttons;
    buttonElements = [];
  },

  preload: function () {
    game.load.image('title', 'images/menu_titles/' + titlePath + '.png', titleWidth, rowHeight);
  },

  create: function () {
    menuBg = game.add.sprite(0, 0, 'menu_bg'); 

    var button_count = buttons.length;

    title = game.add.sprite(0, 0, 'title');

    var button, element;
    for (var i = 0; i < button_count; i++) {
      button = buttons[i];
      element = game.add.button(0, 0, button.name + "ButtonImage", button.onclick, this, 1, 0, 2, 0);
      buttonElements.push(element);
    }
  },

  update: function () {
    menuBg.width = viewWidth;
    menuBg.height = viewHeight;

    var button_count = buttonElements.length;

    var row_count = 1 + button_count;
    var spacing = viewHeight / ( row_count + 1 );
    var verticalPosition = i => spacing * (i + 1);

    var scaleFactor = spacing * 0.6 / rowHeight;

    title.x = game.world.centerX;
    title.y = verticalPosition(0);
    title.anchor.setTo(0.5, 0.5);
    title.scale.setTo(scaleFactor * 1.5);

    var button;
    for (var i = 0; i < button_count; i++) {
      element = buttonElements[i];
      element.x = game.world.centerX;
      element.y = verticalPosition(i + 1);
      element.anchor.setTo(0.5, 0.5);
      element.scale.setTo(scaleFactor);
    }
  }
};
