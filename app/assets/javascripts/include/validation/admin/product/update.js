I18n.locale = "vi";
$(document).ready(function() {
  $("#frmAddProductEdit").validate({
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
        number: true
      },
      "product[description]": {
        required: true,
        minlength: 70,
        maxlength: 500
      },
      "product[images][]": {
        accept:"jpg,png,jpeg,gif",
        filesize: 3024000,
        mximg: true
      }
    },
    messages: {
      "product[category_id]":{
        required: I18n.t("javascript.validation.product.update.category_id.required")
      },
      "product[name]":{
        required: I18n.t("javascript.validation.product.update.name.required")
      },
      "product[price]": {
        required: I18n.t("javascript.validation.product.update.price.required"),
        number: I18n.t("javascript.validation.product.update.price.number")
      },
      "product[quantity]": {
        required: I18n.t("javascript.validation.product.update.quantity.required"),
        number: I18n.t("javascript.validation.product.update.quantity.number")
      },
      "product[description]": {
        required: I18n.t("javascript.validation.product.update.description.required"),
        minlength: I18n.t("javascript.validation.product.update.description.minlength"),
        maxlength: I18n.t("javascript.validation.product.update.description.maxlength"),
      },
      "product[images][]": {
        accept: I18n.t("javascript.validation.product.update.images.accept"),
        filesize: I18n.t("javascript.validation.product.update.images.filesize"),
        mximg: I18n.t("javascript.validation.product.update.images.mximg")
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

$.validator.addMethod("mximg", function (value, element) {
  var file = element.files.length;
  var id   = $("#product_id").val();
  var count = 0;
  $.ajax({
    url: '/admin/product/check_count_images/' + id,
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    dataType: 'JSON',
    async: false,
    success: function (response) {
      count = file + parseInt(response);
    },
    error: function (err) {
      console.log(err);
    }
  });
  if (count >= 2 && count <= 4) return true;
  return false;
});



$.validator.addMethod('filesize', function (value, element, param) {
    return this.optional(element) || (element.files[0].size <= param)
}, 'File size must be less than {0}');
