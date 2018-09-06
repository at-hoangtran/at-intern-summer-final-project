$(document).ready(function() {
  $("#frmAddUserEdit").validate({
    ignore: [],
    rules: {
      "user[name]": {
        required: true,
        maxlength: 30,
      },
      "user[email]": {
        required: true,
        maxlength: 50,
        minlength: 6,
        email: true
      },
      "user[address]": {
        required: true
      },
      "user[phone]": {
        required: true,
        number: true,
        minlength: 9,
        maxlength: 15
      },
      "user[image]": {
         accept:"jpg,png,jpeg,gif"
      }
    },
    messages: {
      "user[name]":{
        required: "Vui lòng nhập họ tên !",
        maxlength: "Họ tên không quá 30 ký tự !"
      },
      "user[email]":{
        required: "Vui lòng nhập email !",
        email: "Email không đúng định dạng !",
        maxlength: "Email không quá 50 ký tự !",
        minlength: "Email tối thiểu 6 ký tự !"
      },
      "user[address]": {
        required: "Vui lòng nhập địa chỉ"
      },
      "user[phone]": {
        required: "Vui lòng nhập số điện thoại !",
        number: "Vui lòng nhập số !",
        minlength: "Số điện thoại tối thiểu 9 ký tự !",
        maxlength: "Số điện thoại không quá 15 ký tự !"
      },
      "user[image]": {
        accept: "Định dạng không đúng (jpg, png, gif)"
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
