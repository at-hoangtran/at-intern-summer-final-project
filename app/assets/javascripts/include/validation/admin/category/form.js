I18n.locale = "vi";
$(document).ready(function() {
  $("#frmCategory").validate({
    ignore: [],
    rules: {
      "category[name]": {
        required: true
      }
    },
    messages: {
      "category[name]":{
        required: I18n.t("javascript.validation.category.required")
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
