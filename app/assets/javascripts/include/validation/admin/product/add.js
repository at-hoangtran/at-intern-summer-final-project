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
        number: true,
        minprice: 0
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
        required: "Vui lòng chọn danh mục !"
      },
      "product[name]":{
        required: "Vui lòng nhập tên sản phẩm !"
      },
      "product[price]": {
        required: "Vui lòng nhập gía !",
        number: "Vui lòng nhập số !",
        minprice: "Vui lòng nhập tiền không được âm !"
      },
      "product[quantity]": {
        required: "Vui lòng nhập số lượng !",
        number: "Vui lòng nhập số lượng !",
        minsize: "Số lượng tối thiểu 1 sản phẩm !"
      },
      "product[description]": {
        required: "Vui lòng nhập mô tả !",
        minlength: "Mô tả tối thiểu 70 ký tự !",
        maxlength: "Mô tả tối đa 500 ký tự !"
      },
      "product[images][]": {
        required: "Vui lòng chọn ảnh !",
        accept: "Kiểu tệp không hợp lệ !",
        filesize: "File dung lượng tối đa không quá 3mb !",
        mximg: "Vui lòng chọn tối thiểu 2 hình ảnh, tối đa 4 hình ảnh !"
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

$.validator.addMethod("minprice", function (value, element, param) {
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
