window.addEventListener('load', function() {
  var h = $('#subscription-form').height();
  var w = $('#subscription-form').width();
  $('.msg-box').height(h);
  $('.msg-box').width(w);

  $('#success-box').hide();
  $('#error-box').hide();
  $('#subscription-form').submit(function (event) {
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
  $('#subscription-form').hide();
  $('#success-box').show();
}

function failureOccured() {
  $('#subscription-form').hide();
  $('#error-box').show();
}
