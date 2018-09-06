I18n.locale = "vi";
$(document).ready(function() {
  $("#frmResetPasswordEdit").validate({
    ignore: [],
    rules: {
      "user[password]": {
        required: true,
        minlength: 6
      },
      "user[password_confirmation]": {
        required: true,
        minlength: 6,
        equalTo: "#password"
      }
    },
    messages: {
      "user[password]": {
        required: I18n.t("javascript.validation.edit_password.password.required"),
        minlength: I18n.t("javascript.validation.edit_password.password.minlength")
      },
      "user[password_confirmation]": {
        required: I18n.t("javascript.validation.edit_password.password_confirmation.required"),
        minlength: I18n.t("javascript.validation.edit_password.password_confirmation.minlength"),
        equalTo: I18n.t("javascript.validation.edit_password.password_confirmation.equalTo")
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
