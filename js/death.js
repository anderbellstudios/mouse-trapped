var rowHeight = 225;
var buttonWidth = 600;
var nextLevel;
var deathButtonElements;
var deathBg;

var death = {
  init: function (_next_level, _message) {
    nextLevel = _next_level;
    setMessageText(_message);
  },

  create: function () {
    Audio.playMusic('replaceable');

    deathBg = game.add.sprite(0, 0, 'death_bg'); 

    buttons = [ 
      { name: 'tryAgainButtonImage', onclick: function () { continuePlaying(); } }, 
      { name: 'quitButtonImage',     onclick: function () { quitGame(); } } 
    ];

    var button;
    deathButtonElements = [];
    for (var i = 0, len = buttons.length; i < len; i++) {
      button = buttons[i];
      element = game.add.button(0, 0, button.name, button.onclick, this, 1, 0, 2, 0);
      deathButtonElements.push(element);
    }
  },

  update: function () {
    deathBg.width = viewWidth;
    deathBg.height = viewHeight;

    var spacing = viewWidth / ( buttons.length + 1 );
    var horizontalPosition = i => spacing * (i + 1);
    var scaleFactor = spacing * 0.9 / buttonWidth;
    var verticalPosition = viewHeight - (rowHeight * scaleFactor);

    var element;
    for (var i = 0, len = deathButtonElements.length; i < len; i++) {
      element = deathButtonElements[i];
      element.x = horizontalPosition(i);
      element.y = verticalPosition;
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
