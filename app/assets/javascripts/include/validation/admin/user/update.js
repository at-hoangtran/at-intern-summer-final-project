I18n.locale = "vi";
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
        minlength: 10,
        maxlength: 11
      },
      "user[image]": {
         accept:"jpg,png,jpeg,gif"
      }
    },
    messages: {
      "user[name]":{
        required: I18n.t("javascript.validation.register.name.required"),
        maxlength: I18n.t("javascript.validation.register.name.maxlength")
      },
      "user[email]":{
        required: I18n.t("javascript.validation.register.email.required"),
        email: I18n.t("javascript.validation.register.email.email"),
        maxlength: I18n.t("javascript.validation.register.email.maxlength"),
        minlength: I18n.t("javascript.validation.register.email.minlength")
      },
      "user[address]": {
        required: I18n.t("javascript.validation.register.address.required")
      },
      "user[phone]": {
        required: I18n.t("javascript.validation.register.phone.required"),
        number: I18n.t("javascript.validation.register.phone.number"),
        minlength: I18n.t("javascript.validation.register.phone.minlength"),
        maxlength: I18n.t("javascript.validation.register.phone.maxlength")
      },
      "user[image]": {
        accept: I18n.t("javascript.validation.register.image.accept")
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
