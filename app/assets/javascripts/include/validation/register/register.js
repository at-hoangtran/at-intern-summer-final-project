$(document).ready(function() {
  $("#frmRegister").validate({
    ignore: [],
    rules: {
      "user[name]": {
        required: true,
        maxlength: 255,
        minlength: 6,
      },
      "user[email]": {
        required: true,
        maxlength: 255,
        minlength: 6,
        email: true
        // remote:"/users/check_email"
      },
      "user[password]": {
        required: true,
        minlength: 6
      },
      "user[password_confirmation]": {
        required: true,
        minlength: 6,
        equalTo: "#password_r"
      }
    },
    messages: {
      "user[name]":{
        required: "Vui lòng nhập họ tên !",
        maxlength: "name quá 255 ký tự !",
        minlength: "name phải tối thiểu 6 ký tự !"
        // remote: "Email này đã tồn tại !"
      },
      "user[email]":{
        required: "Vui lòng nhập email !",
        email: "Email bạn không hợp lệ !",
        maxlength: "Email quá 255 ký tự !",
        minlength: "Email phải tối thiểu 6 ký tự !"
        // remote: "Email này đã tồn tại !"
      },
      "user[password]": {
        required: "Vui lòng nhập mật khẩu !",
        minlength: "Mật khẩu tối thiểu 6 ký tự !"
      },
      "user[password_confirmation]": {
        required: "Vui lòng nhập mật khẩu !",
        minlength: "Mật khẩu tối thiểu 6 ký tự !",
        equalTo: "Mật khẩu nhập lại không khớp !"
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
