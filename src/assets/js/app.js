var calculate = document.getElementById("pass");
// Loader
$(window).on('load', function() {
    $('.status').fadeOut();
    $('.preloader').delay(200).fadeOut('slow');
    $('body').delay(200).css({
        'overflow': 'visible'
    });
});

$("#anterior").on("click", function () {
 $('#nuevo option').prop('selected', function() {
    return this.defaultSelected;
  });
});

// Boton Retroceder :V
$.fn.backButton = function() {
    if (document.referrer !== "") {
      $(this).show();
      $(this).on('click', function(e) {
        e.preventDefault();
        window.location.href = document.referrer;
      });
    }
  }
  
$('.back-button').backButton();