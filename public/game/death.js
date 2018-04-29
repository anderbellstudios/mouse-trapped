var rowHeight = 225;
var buttonWidth = 600;
var nextLevel;

var death = {
  init: function (_next_level, _message) {
    nextLevel = _next_level;
    setMessageText(_message);
  },

  create: function () {
    Audio.playMusic('replaceable');

    var bg = game.add.sprite(0, 0, 'death_bg'); 
    bg.width = viewWidth;
    bg.height = viewHeight;

    buttons = [ 
      { name: 'tryAgainButtonImage', onclick: function () { continuePlaying(); } }, 
      { name: 'quitButtonImage',     onclick: function () { quitGame(); } } 
    ];

    var spacing = viewWidth / ( buttons.length + 1 );
    var horizontalPosition = i => spacing * (i + 1);
    var scaleFactor = spacing * 0.9 / buttonWidth;
    var verticalPosition = viewHeight - (rowHeight * scaleFactor);

    var button;
    for (var i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      element = game.add.button(horizontalPosition(i), verticalPosition, button.name, button.onclick, this, 1, 0, 2, 0);
      element.anchor.setTo(0.5, 0.5);
      element.scale.setTo(scaleFactor);
    }
  }
};

function continuePlaying() {
  fadeToLevel(nextLevel, "Have another go.", "interlevel");
}

function quitGame() {
  Audio.stopAll();
  launch_menu('main_menu', main_menu);
}
