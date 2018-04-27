var rowHeight = 225;
var buttonWidth = 600;
var nextLevel;

var death = {
  init: function (_next_level, _message) {
    nextLevel = _next_level;
    setMessageText(_message);
  },

  create: function () {
    if (user_settings.music_enabled) {
      music = game.add.sound('replaceable', 0.2, true);
      music.play();
    }

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
  if (music != undefined) {
    music.stop();
  }

  if (dialogue != undefined) {
    dialogue.stop();
  }

  game.state.start('playing', true, false, nextLevel);
}

function quitGame() {
  if (music != undefined) {
    music.stop();
  }

  if (dialogue != undefined) {
    dialogue.stop();
  }

  game.state.start('menu', true, false, 'main_menu', main_menu);
}
