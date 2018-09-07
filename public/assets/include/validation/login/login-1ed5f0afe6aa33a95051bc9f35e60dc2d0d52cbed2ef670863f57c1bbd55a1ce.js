$(document).ready(function() {
  $("#frmLogin").validate({
    ignore: [],
    rules: {
      "user[email]": {
        required: true,
        maxlength: 50,
        minlength: 6,
        email: true
      },
      "user[password]": {
        required: true,
        minlength: 6
      }
    },
    messages: {
      "user[email]":{
        required: "Vui lòng nhập email !",
        email: "Vui lòng nhập đúng định dạng email !",
        maxlength: "Vui lòng nhập email không quá 50 ký tự !",
        minlength: "Vui lòng nhập email tối thiểu 6 ký tự !"
      },
      "user[password]": {
        required: "Vui lòng nhập mật khẩu !",
        minlength: "Vui lòng nhập mật khẩu tối thiểu 6 ký tự !"
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
