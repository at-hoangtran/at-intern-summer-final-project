var time = {
  start: null,
  end: null
}

$(document).ready(function() {
  $("#frmTimer").validate({
    ignore: [],
    rules: {
      "timer[product_id]": {
        required: true
      },
      "timer[start_at]": {
        required: true,
        stime: true,
        mxtime: true
      },
      "timer[end_at]": {
        required: true,
        edtime: true,
        mxtime: true
      },
      "timer[period]": {
        required: true,
        period: true
      },
      "timer[step]": {
        required: true
      }
    },
    messages: {
      "timer[product_id]":{
        required: "Vui lòng chọn tên sản phẩm !"
      },
      "timer[start_at]":{
        required: "Vui lòng chọn thời gian bắt đầu !",
        stime: "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc !",
        mxtime: "Vui lòng chọn khung giờ từ (5h AM - 23h PM)"
      },
      "timer[end_at]":{
        required: "Vui lòng chọn thời gian kết thúc !",
        edtime: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu !",
        mxtime: "Vui lòng chọn khung giờ từ (5h AM - 23h PM)"
      },
      "timer[period]":{
        required: "Vui lòng chọn thời gian đếm ngược !",
        period: "Vui chọn thời gian đếm ngược phải trên 20 giây !"
      },
      "timer[step]":{
        required: "Vui lòng chọn bước tăng tiền !"
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

$.validator.addMethod("mxtime", function (value, element) {
  var hours = value.split(":")[0];
  if (hours < 5 || hours > 23) {
    return false;
  }
  return true;
});

$.validator.addMethod("stime", function (value, element) {
  var hours = value.split(":")[0];
  time.start = hours;
  if (time.end !== null) {
    if (time.start > time.end) {
      return false;
    }
  }
  return true;
});

$.validator.addMethod("edtime", function (value, element) {
  var hours = value.split(":")[0];
  time.end = hours;
  if (time.start !== null) {
    if (time.end < time.start) {
      return false;
    }
  }
  return true;
});

$.validator.addMethod("period", function (value, element) {
  var minute = value.split(":")[0];
  var sounds = value.split(":")[1];
  if (minute == 00) {
    if (sounds < 20) {
      return false;
    }
  }
  return true;
});
