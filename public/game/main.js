var game, gridWidth, gridHeight, viewWidth, viewHeight, tileSize;

var rowHeight = 225;
var buttonWidth = 600;
var titleWidth = 1150;

var user_settings = {
  music_enabled: true,
  sounds_enabled: true
}

function launch_menu(name, buttons) {
  game.state.start('menu', true, false, name, buttons);
}

function controlled_levelport(from_start) {
  var level_code = prompt("Enter your level code here...");
  var level = level_for(level_code);
  if (level) {
    if (from_start) {
      gtag('event', level, { 'event_category' : 'Game was started'}); 
    } else {
      gtag('event', level, { 'event_category' : 'Levelport occurred' }); 
    }
    fadeToLevel(level, "Levelporting...", "interlevel");
  } else {
    alert("Code invalid.");
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
      controlled_levelport(true);
  } },
  { name: 'options', onclick: function () { launch_menu('options', options_menu); } }
];

var options_menu = [
  { name: 'music',  onclick: function () { launch_menu('music', music_menu); } },
  { name: 'sounds', onclick: function () { launch_menu('sounds', sounds_menu); } },
  { name: 'back',   onclick: function () { launch_menu('main_menu', main_menu); } }
];

var music_menu = [
  { name: 'on',  onclick: function () { user_settings.music_enabled = true;  launch_menu('options', options_menu); } },
  { name: 'off', onclick: function () { user_settings.music_enabled = false; launch_menu('options', options_menu); } }
];

var sounds_menu = [
  { name: 'on',  onclick: function () { user_settings.sounds_enabled = true;  launch_menu('options', options_menu); } },
  { name: 'off', onclick: function () { user_settings.sounds_enabled = false; launch_menu('options', options_menu); } }
];

function fadeToLevel(lvl, msg, cutscene) {
  Audio.stopAll();
  cutsceneInProgress = true;
  setMessageText(msg);
  Fade.toBlack(game, 1000, function () {
    //game.state.start("cutscene", true, false, cutscene, function () {
    setTimeout(function () {
      game.state.start('playing', true, false, lvl);
      cutsceneInProgress = false;
    }, 3000);
    //});
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

  game.state.add('boot', boot);
  game.state.add('preloader', preloader);
  game.state.add('menu', menu);
  game.state.add('playing', playing);
  game.state.add('cutscene', cutscene);
  game.state.add('death', death);

  game.state.start('boot');
}, false);
