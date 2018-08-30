$(document).ready(function(){
  $("#formOrder").validate({
    ignore: [],
    rules: {
      "order[user_name]": {
        required: true,
        maxlength: 30
      },
      "order[address]": {
        required: true
      },
      "order[phone]": {
        required: true,
        number: true,
        maxlength: 15,
        minlength: 9
      }
    },
    messages: {
      "order[user_name]": {
        required: "Vui lòng nhập họ tên!",
        maxlength: "Họ tên không quá 30 kí tự!"
      },
      "order[address]": {
        required: "Vui lòng nhập địa chỉ!"
      },
      "order[phone]": {
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