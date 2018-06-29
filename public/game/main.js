var game, gridWidth, gridHeight, viewWidth, viewHeight, tileSize;

var rowHeight = 225;
var buttonWidth = 600;
var titleWidth = 1150;
var mc = false;

var user_settings = {
  music_enabled: true,
  sounds_enabled: true
}

function toggle_mc() {
  mc = !mc;
  if (mc) {
    enable_mc();
  } else {
    disable_mc();
  }
}

function enable_mc() {
  $('#mc-status').text("ON");
  $('#game-buttons').css('display', 'flex');
}

function disable_mc() {
  $('#mc-status').text("OFF");
  $('#game-buttons').css('display', 'none');
}

function launch_menu(name, buttons) {
  game.state.start('menu', true, false, name, buttons);
}

function display_levelport(from_start) {
  $('#levelport-from-start').val(from_start ? 1 : 0);
  $('#levelport-container').fadeIn();
  game.paused = true;
  game.input.enabled = false;
  setTimeout(function () {
    $('#levelport-code').focus();
  }, 500);
}

function levelport(code, from_start) {
  var level = level_for(code);
  if (level) {
    if (from_start) {
      gtag('event', level, { 'event_category' : 'Game was started'}); 
    } else {
      gtag('event', level, { 'event_category' : 'Levelport occurred' }); 
    }
    hide_levelport();
    fadeToLevel(level, "Levelporting...", "interlevel");
  } else {
    $('#levelport-error').text('Invalid code.');
    $('#levelport-code').select();
  }
}

function level_for(code) {
  var result = $.ajax({
    type: "GET",
    url: '/level_code/' + code,
    async: false
  }).responseText.replace(/\n|\r/g,'');

  if (result == 'invalid') { 
    return false;
  } else {
    return result;
  }
}

var main_menu = [
  { name: 'play', onclick: function () { 
      gtag('event', '01', { 'event_category' : 'Game was started' }); 
      game.state.start('playing', true, false, '01'); 
  } },
  { name: 'resume', onclick: function () { 
      display_levelport(true);
  } }
];

function fadeToLevel(lvl, msg, cutscene) {
  Audio.stopAll();
  cutsceneInProgress = true;
  setMessageText(msg);
  Fade.toBlack(game, 1000, function () {
    game.state.start("cutscene", true, false, 'cutscenes/interlevel',
      ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"], function () {
      game.state.start('playing', true, false, lvl);
      cutsceneInProgress = false;
    });
  });
}

var messageId = 0; 

function setMessageText(text) {
  $('#message').text(text);
  text_height = $('#message').height();
  $('#message').css('transform', 'translateY(-' + (text_height + 15) + 'px)');
  messageId++;
  var oldId = messageId;
  setTimeout(function (){
    if (messageId == oldId) {
      $('#message').text("");
    }
  }, 10000);
}

window.addEventListener("load",function(event) {
  var table = document.createElement('table');
  for (var i = 0; i < 24; i++) {
    var row = table.insertRow(i);
    for (var j = 0; j < 64; j++) {
      var cell = row.insertCell(j);
      cell.innerHTML = "&nbsp;";
    }
  }
  $('#cutscene-container').append(table);

  var size = resize(undefined);

  game = new Phaser.Game(
    size[0], 
    size[1], 
    Phaser.CANVAS,
    'game-container'
  );

  $(window).resize(function () {
    resize(game);
  });

  window.addEventListener("orientationchange", function() {
    resize(game);
  });

  $('#game-container').on('click touchstart', function () {
    var scroll = $('#game-container').offset().top + ( viewHeight / 2 ) - ( window.innerHeight / 2 );
    $('body').animate({ 'scrollTop': scroll });
  });

  $(".arrow-button").on('mousedown touchstart', function () {
    this.down = true;
  }).on('mouseup touchend touchcancel', function () {
    this.down = false;
  }).on('touchmove', function (e) {
    e.preventDefault();
  });

  var submit_levelport = function () {
    code = $('#levelport-code').val();
    levelport( code, $('#levelport-from-start').val() - 0 );
  }

  $('#levelport-submit').click(submit_levelport);

  $('#levelport-code').keypress(function (e) {
    if(e.which == 13) {
      submit_levelport();
    }
  });

  $('#levelport-window').click(function (e) {
    return false;
  });

  $('#levelport-container').click(hide_levelport);
  $('#levelport-cancel').click(hide_levelport);

  $('#audio-settings > *').click(function () {
    $(this).toggleClass('active-tick');
  });

  $('#audio-settings > #music').click(function () {
    user_settings.music_enabled = !user_settings.music_enabled;
    Audio.update();
  });

  $('#audio-settings > #sounds').click(function () {
    user_settings.sounds_enabled = !user_settings.sounds_enabled;
    Audio.update();
  });

  game.state.add('boot', boot);
  game.state.add('preloader', preloader);
  game.state.add('menu', menu);
  game.state.add('playing', playing);
  game.state.add('cutscene', cutscene);
  game.state.add('death', death);

  game.state.start('boot');
}, false);

function hide_levelport() {
  $('#levelport-container').fadeOut(function () {
    $('#levelport-code').val("");
    $('#levelport-code').blur();
    $('#levelport-error').text('');
    game.paused = false;
    game.input.enabled = true;
  });
}
