var buttons = [
  { name: 'play',    onclick: function () { game.state.start('playing', true, false, '01'); } },
  { name: 'options', onclick: function () { alert('This is a placeholder button.'); } }
];

var rowHeight = 225;
var buttonWidth = 600;
var titleWidth = 1500;

var mainMenu = {
  preload: function () {
    var button;
    for (var i = 0; i < buttons.length; i++) {
      button = buttons[i];
      game.load.spritesheet(button.name, 'images/buttons/' + button.name + '.png', buttonWidth, rowHeight);
    }

    game.load.image('title', 'images/title.png', titleWidth, rowHeight);
  },

  create: function () {
    game.stage.backgroundColor = '#D7D5D7';

    var button_count = buttons.length;

    var row_count = 1 + button_count;
    var spacing = viewHeight / ( row_count + 1 );
    var verticalPosition = i => spacing * (i + 1);

    var scaleFactor = spacing * 0.6 / rowHeight;

    var title = game.add.sprite(game.world.centerX, verticalPosition(0), 'title');
    title.anchor.setTo(0.5, 0.5);
    title.scale.setTo(scaleFactor);

    var button, element;
    for (var i = 0; i < button_count; i++) {
      button = buttons[i];
      element = game.add.button(game.world.centerX, verticalPosition(i + 1), button.name, button.onclick, this, 1, 0, 2, 0);
      element.anchor.setTo(0.5, 0.5);
      element.scale.setTo(scaleFactor);
    }
  }
};
