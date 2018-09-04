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
    $(".next-order-3").show();
  });

  $(".payment-onl").on('click', function() {
    $(".cbb_online").prop("checked", true);
    $(".cbb_offline").prop("checked", false);
    $(".pay-info").hide();
    $(".bank-payment").show();
    $(".next-order-3").hide();
  });

  $(".info_billing").on('click', function(){
    $(this).find('input[type="radio"]').prop("checked", true);
    $("#user_name").val($(this).find(".info_item_name").text());
    $("#advanced-placepicker").val($(this).find(".info_item_address").text());
    $("#phone").val($(this).find(".info_item_phone").text());
  });

  $(".new_billing").on('click', function(){
    $(this).hide();
    $(".info_billing").hide();
    $(".form_info_payment").show();
    $("#user_name").val("");
    $("#advanced-placepicker").val("");
    $("#phone").val("");
  });

  $(".return_info").on('click', function(){
    $(".info_billing").show();
    $(".form_info_payment").hide();
    $(".new_billing").show();
  });

  $(".edit_info").on('click', function(){
    $(".info_billing").hide();
    $(".form_info_payment").show();
    $(".new_billing").hide();
    $(".return_billing").show();
  });

  $('.payment_progress_bar li').not('.active').addClass('disabled');
  $('.payment_progress_bar li').not('.active').find('a').removeAttr("data-toggle");

  $(".next-order-1").on('click', function(){
    activaTab('type_payment');
  });

  $(".next-order-3").on('click', function(){
    $("#order_user_name").val($("#user_name").val());
    $("#order_address").val($("#address").val());
    $("#order_phone").val($("#phone").val());
    activaTab('summary_order');
    $(".sum_name_o").html($("#user_name").val());
    $(".sum_address_o").html($("#address").val());
    $(".sum_phone_o").html($("#phone").val());
    $('.payment_progress_bar li.active').next('li').find('a').attr("data-toggle","tab");
  });

  $('[data-toggle-tooltip="tooltip"]').tooltip();

});

function activaTab(tab){
  $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

