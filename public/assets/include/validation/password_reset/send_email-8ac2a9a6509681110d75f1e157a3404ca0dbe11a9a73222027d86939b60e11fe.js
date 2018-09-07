$(document).ready(function() {
  $("#frmResetPassword").validate({
    ignore: [],
    rules: {
      "user[email]": {
        required: true,
        maxlength: 50,
        minlength: 6,
        email: true,
        remote:"/users/check_email_reset"
      }
    },
    messages: {
      "user[email]":{
        required: "Vui lòng nhập email !",
        email: "Email bạn không hợp lệ !",
        maxlength: "Email quá 20 ký tự !",
        minlength: "Email phải tối thiểu 6 ký tự !",
        remote: "Email này không tồn tại !"
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
