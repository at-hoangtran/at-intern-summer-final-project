function openNav() {
  document.getElementById("mySidenav").style.width = "55%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function updateUserForm() {
  $(".edit-user").on('click', function() {
    $('#frmEitProfile input[type="text"]').prop("disabled", false);
    $('#frmEitProfile input[type="password"]').prop("disabled", false);
    $('.edit-user').hide();
    $('.edit-left').show();
  });
}

$(document).ready(function() {
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

$(document).ready(function() {
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

$(document).ready(function() {
  $(".payment-live").on('click', function() {
    $(".cbb_offline").prop("checked", true);
    $(".cbb_online").prop("checked", false);
    $(".pay-live-info").show();
    $(".pay-online").hide();
    $(".bank-payment").hide();
    $(".pay-onl-info").hide();
    $(".btn-pay").show();
  });

  $(".payment-onl").on('click', function() {
    $(".cbb_online").prop("checked", true);
    $(".cbb_offline").prop("checked", false);
    $(".pay-info").hide();
    $(".btn-pay").hide();
    $(".bank-payment").show();
  });

  $(".info_billing").on('click', function(){
    $(this).find('input[type="radio"]').prop("checked", true);
    $("#order_user_name").val($(this).find(".info_item_name").text());
    $("#advanced-placepicker").val($(this).find(".info_item_address").text());
    $("#order_phone").val($(this).find(".info_item_phone").text());
  });

  $(".new_billing").on('click', function(){
    $(".billing-information").hide();
    $(".form_orders").show();
    $(this).hide();
  });

  $(".return_billing").on('click', function(){
    $(".billing-information").show();
    $(".form_orders").hide();
    $(".new_billing").show();
    $(this).hide();
  });

  $(".edit_info").on('click', function(){
    $(".billing-information").hide();
    $(".form_orders").show();
    $(".new_billing").hide();
    $(".return_billing").show();
  });

  $(".next-order").on('click', function(){
    $(".form_checkout").hide();
    $(".billing-information").hide();
    $(".new_billing").hide();
    $(".add_info").hide();
    $(".form_orders").show();
    $(".return_billing").hide();
    $(".payment_information").show();
    $(".progress_first").css("background-color", "#eee");
    $(".progress_second").css("background-color", "#16a085");
    $(".progress_second a").css("color", "white");
    $(".progress_first a").css("color", "#16a085");
    $(this).hide();
  });
});
