$(document).ready(function() {
  $(".form_info_item").validate({
    ignore: [],
    rules: {
      "user_name": {
        required: true,
        maxlength: 30
      },
      "address": {
        required: true
      },
      "phone": {
        required: true,
        number: true,
        maxlength: 15,
        minlength: 9
      }
    },
    messages: {
      "user_name": {
        required: "Vui lòng nhập họ tên!",
        maxlength: "Họ tên không quá 30 kí tự!"
      },
      "address": {
        required: "Vui lòng nhập địa chỉ!"
      },
      "phone": {
        required: "Vui lòng nhập số điện thoại!",
        number: "Sai đinh dạng, vui lòng nhập số",
        maxlength: "Số điện thoại không quá 15 kí tự!",
        minlength: "Số điện thoại tối thiểu 9 kí tự!"
      }
    },
    highlight: function (element) {
      $(element).closest('.control-group').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.control-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
      if (element.parent('.input-group').length) {
        error.insertAfter(element.parent());
      } else {
          error.insertAfter(element);
      }
    }
  });
});
