$(document).ready(function() {
  $("#frmImportProduct").validate({
    ignore: [],
    rules: {
      "file": {
        required: true,
        extension: "xlsx|xls|xlsm"
      }
    },
    messages: {
      "file":{
        required: "Vui lòng chọn file !",
        extension: "Vui lòng chọn file (.xls, .xlsx)."
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
