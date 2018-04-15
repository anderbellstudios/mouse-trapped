window.addEventListener('load' function() {
  var h = $('form').height();
  var w = $('form').width();
  $('.msg-box').height(h);
  $('.msg-box').width(w);

  $('#success-box').hide();
  $('#error-box').hide();
  $('form').submit(function (event) {
    event.preventDefault();
    var valuesToSubmit = $(this).serialize();
    $.ajax({
      type: "POST",
      url: $(this).attr('action'), 
      data: valuesToSubmit,
      success: function(data) {
        if (data == "success\n") {
          successOccured();
        } else {
          failureOccured();
        }
      },
      error: function(data) {
        failureOccured();
      }
    });
    return false;
  });
}, false);

function successOccured() {
  $('form').hide();
  $('#success-box').show();
}

function failureOccured() {
  $('form').hide();
  $('#error-box').show();
}
