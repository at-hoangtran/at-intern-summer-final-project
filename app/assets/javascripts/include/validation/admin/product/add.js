I18n.locale = "vi";
$(document).ready(function() {
  $("#frmAddProduct").validate({
    ignore: [],
    rules: {
      "product[category_id]": {
        required: true
      },
      "product[name]": {
        required: true
      },
      "product[price]": {
        required: true,
        number: true
      },
      "product[quantity]": {
        required: true,
        number: true,
        minsize: 0
      },
      "product[description]": {
        required: true,
        minlength: 70,
        maxlength: 500
      },
      "product[images][]": {
        required: true,
        accept:"jpg,png,jpeg,gif",
        filesize: 3024000,
        mximg: true
      }
    },
    messages: {
      "product[category_id]":{
        required: I18n.t("javascript.validation.product.add.category_id.required")
      },
      "product[name]":{
        required: I18n.t("javascript.validation.product.add.name.required")
      },
      "product[price]": {
        required: I18n.t("javascript.validation.product.add.price.required"),
        number: I18n.t("javascript.validation.product.add.price.number")
      },
      "product[quantity]": {
        required: I18n.t("javascript.validation.product.add.quantity.required"),
        number: I18n.t("javascript.validation.product.add.quantity.number"),
        minsize: I18n.t("javascript.validation.product.add.quantity.minsize")
      },
      "product[description]": {
        required: I18n.t("javascript.validation.product.add.description.required"),
        minlength: I18n.t("javascript.validation.product.add.description.minlength"),
        maxlength: I18n.t("javascript.validation.product.add.description.maxlength"),
      },
      "product[images][]": {
        required: I18n.t("javascript.validation.product.add.images.required"),
        accept: I18n.t("javascript.validation.product.add.images.accept"),
        filesize: I18n.t("javascript.validation.product.add.images.filesize"),
        mximg: I18n.t("javascript.validation.product.add.images.mximg")
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

$.validator.addMethod("minsize", function (value, element, param) {
  if (value > param) return true;
  return false;
});

$.validator.addMethod("mximg", function (value, element) {
  var file = element.files.length;
  if (file >= 2 && file <= 4) return true;
  return false;
});

$.validator.addMethod('filesize', function (value, element, param) {
    return this.optional(element) || (element.files[0].size <= param)
}, 'File size must be less than {0}');
