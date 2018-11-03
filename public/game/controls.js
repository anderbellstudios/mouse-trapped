var Controls = {
  any: function(method) {
    return [ 
      Control_WASD, 
      Control_HJKL, 
      Control_Arrows, 
      Control_Buttons,
      Control_DPad,
      Control_Joystick
    ].some( function (source) {
      if ( source.enabled() )
        return source[method]();
    });
  },

  up:    function() { return this.any('up');    },
  down:  function() { return this.any('down');  },
  left:  function() { return this.any('left');  },
  right: function() { return this.any('right'); }
};

function is_key_down(key_name) {
  return game.input.keyboard.addKey(
    Phaser.Keyboard[key_name]
  ).isDown;
};

var Control_WASD = {
  enabled: function() { return true; },
  up:    function() { return is_key_down('W'); },
  down:  function() { return is_key_down('S'); },
  left:  function() { return is_key_down('A'); },
  right: function() { return is_key_down('D'); }
};

var Control_HJKL = {
  enabled: function() { return true; },
  up:    function() { return is_key_down('K'); },
  down:  function() { return is_key_down('J'); },
  left:  function() { return is_key_down('H'); },
  right: function() { return is_key_down('L'); }
};

var Control_Arrows = {
  enabled: function() { return true; },
  up:    function() { return is_key_down('UP');    },
  down:  function() { return is_key_down('DOWN');  },
  left:  function() { return is_key_down('LEFT');  },
  right: function() { return is_key_down('RIGHT'); }
};

var Control_Buttons = {
  enabled: function() { return true; },
  up:    function() { return $('#up-arrow')[0].down;    },
  down:  function() { return $('#down-arrow')[0].down;  },
  left:  function() { return $('#left-arrow')[0].down;  },
  right: function() { return $('#right-arrow')[0].down; }
};

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function gamepad() {
  return navigator.getGamepads()[0];
}

var Control_DPad = {
  enabled: function() { return !!gamepad(); },
  up:    function() { return gamepad().buttons[12].pressed; },
  down:  function() { return gamepad().buttons[13].pressed; },
  right: function() { return gamepad().buttons[15].pressed; },
  left:  function() { return gamepad().buttons[14].pressed; }
};

function joystick_angle() {
  var x = gamepad().axes[0];
  var y = gamepad().axes[1];
  
  if ( x**2 + y**2 > 0.5 ) {
    return Math.atan2(y, x) * (180 / Math.PI);
  } else {
    return undefined;
  }
}

var Control_Joystick = {
  enabled: function() { return !!gamepad(); },
  up:    function() { return joystick_angle() < -45 && joystick_angle() > -135; },
  down:  function() { return joystick_angle() >  45 && joystick_angle() <  135; },
  right: function() { return joystick_angle() > -45 && joystick_angle() <   45; },
  left:  function() { return joystick_angle() > 135 || joystick_angle() < -135; }
};
