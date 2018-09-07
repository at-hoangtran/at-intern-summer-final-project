function openNav() {
  document.getElementById("mySidenav").style.width = "45%";
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
    infoPayment();

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
    validateOrder();
  });

  $(".next-order-3").on('click', function(){
    $("#order_user_name").val($("#user_name").val());
    $("#order_address").val($("#advanced-placepicker").val());
    $("#order_phone").val($("#phone").val());
    $(".sum_name_o").html($("#user_name").val());
    $(".sum_address_o").html($("#advanced-placepicker").val());
    $(".sum_phone_o").html($("#phone").val());
    $('.payment_progress_bar li.active').next('li').find('a').attr("data-toggle","tab");
    validateCheckbox();
    checkPayment();
  });

  $(".btn-pay-online").on('click', function(){
    if ($(".cbb_online").is(':checked')) {
      var order_id = $(".order_id").html();
      var sum_pay = $(".sum_pay").html();
      var urlNganluong = 'https://www.nganluong.vn/button_payment.php?receiver=tranhuyhoang1011@gmail.com&product_name=AU' + order_id +'&price=' + sum_pay + '&return_url=(URL thanh toán thành công)&comments=Giao Hàng Tiêu Chuẩn - giao hàng tận nơi.';
      window.location.href = urlNganluong;
      console.log(urlNganluong);
      console.log(sum_pay);

    }
  });

  $('[data-toggle-tooltip="tooltip"]').tooltip();
  infoPayment();
});

function activaTab(tab){
  $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

function checkPayment() {
  if ($(".cbb_offline").is(':checked')) {
    $("#order_type_payment").val($(".cbb_offline").val());
    $(".type_payment_o").html("Nhận hàng thanh toán")
    $(".btn-pay").show();
    $(".btn-pay-online").hide();
  }
  else{
    $("#order_type_payment").val($(".cbb_online").val());
    $(".btn-pay").hide();
    $(".btn-pay-online").show();
    $(".type_payment_o").html("ATM/Chuyển khoản")
  }
}

function infoPayment() {
  if($(".info_billing").find('input[type="radio"]').is(':checked')) {
    $("#user_name").val($(".info_billing").find(".info_item_name").text());
    $("#advanced-placepicker").val($(".info_billing").find(".info_item_address").text());
    $("#phone").val($(".info_billing").find(".info_item_phone").text());
  }
}



function validateOrder() {
  var phoneno = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

  var check = true;

  if ($("#user_name").val() == "") {
    $(".error_name").html('Vui lòng nhập tên người nhận !');
    check = false;
  }
  else {
    $(".label_name").find("p").hide();
  }
  if ($("#advanced-placepicker").val() == ""){
    $(".error_address").html(' Vui lòng nhập địa chỉ !');
    check = false;
  }
  else {
    $(".label_address").find("p").hide();
  }
  if ($("#phone").val() == "") {
    $(".error_phone").html('Vui lòng nhập số điện thoại !');
    check = false;
  }
  if (!$("#phone").val().match(phoneno)) {
    $(".error_phone").html('Vui lòng nhập đúng số điện thoại !');
    check = false;
  }
  if(check) {
    activaTab('type_payment');
  };
}

function validateCheckbox() {
  if ($(".form-check input[type = checkbox]:checked").length == 0) {
    alert("Vui lòng chọn hình thức thanh toán !");
  }
  else {
    activaTab('summary_order');
  }
}

function validateRadio() {
  if ($(".info_billing input[type=radio]:checked").length == 0) {
    alert("Vui lòng chọn địa chỉ !");
  }
}
