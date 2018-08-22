function openNav() {
  document.getElementById("mySidenav").style.width = "55%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function updateUserForm() {
  $(".edit-user").on('click', function() {
    $('#frmEitProfile input[type="text"]').prop("disabled", false);
    $('.edit-user').hide();
    $('.edit-left').show();
  });
}
$(document).on('turbolinks:load', function() {
  $(".dropdown").hover(function() {
    $('.dropdown-menu', this).stop(true, true).fadeIn("fast");
    $(this).toggleClass('open');
    $('b', this).toggleClass("caret caret-up");
  }, function() {
    $('.dropdown-menu', this).stop(true, true).fadeOut("fast");
    $(this).toggleClass('open');
    $('b', this).toggleClass("caret caret-up");
  });
});

$(document).on('turbolinks:load', function() {
  updateUserForm();
  backToTop();
});

function formatPrice(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function fmtMSS(s) {
  return(s - (s%=60)) / 60 + (9 < s ? ':':':0') + s
}

function backToTop() {
  $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
          $('#back-to-top').fadeIn();
      } else {
          $('#back-to-top').fadeOut();
      }
  });
  // scroll body to 0px on click
  $('#back-to-top').click(function () {
      $('#back-to-top').tooltip('hide');
      $('body,html').animate({
          scrollTop: 0
      }, 800);
      return false;
  });

  $('#back-to-top').tooltip('show');
}

$('.carousel').carousel({
  interval: false
});


$(document).on('turbolinks:load', function() {
  $(".payment-live").on('click', function() {
    $("#pay-live_").prop("checked", true);
    $("#pay-online_").prop("checked", false);
    $(".pay-live").show();
    $(".pay-info").show();
    $(".pay-online").hide();
  });
  $(".payment-onl").on('click', function() {
    $("#pay-online_").prop("checked", true);
    $("#pay-live_").prop("checked", false);
    $(".pay-live").hide();
    $(".pay-info").show();
    $(".pay-online").show();
  });
});
