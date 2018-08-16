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
        mxtime: true,
        min20: true
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
        mxtime: "Vui lòng chọn khung giờ từ (8h AM - 22h PM)"
      },
      "timer[end_at]":{
        required: "Vui lòng chọn thời gian kết thúc !",
        edtime: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu !",
        mxtime: "Vui lòng chọn khung giờ từ (5h AM - 23h PM)",
        min20: "Khoảng thời gian bắt đầu và kết thúc phải lớn hơn 20s!"
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

$(document).on('turbolinks:load', function() {
  time.start = fmtMSS($('input[name="timer[start_at]"]').val());
  time.end = fmtMSS($('input[name="timer[end_at]"]').val());
});

$.validator.addMethod("mxtime", function (value, element) {
  var hours = value.split(":")[0];
  if (hours < 8 || hours > 22) {
    return false;
  }
  return true;
});

$.validator.addMethod("stime", function (value, element) {
  var timer = fmtMSS(value)
  time.start = timer;
  if (time.end !== null) {
    if (time.start > time.end || time.end === time.start) {
      return false;
    }
  }
  return true;
});

$.validator.addMethod("edtime", function (value, element) {
  var timer = fmtMSS(value);
  time.end = timer;
  if (time.start !== null) {
    subtimer = (time.end - time.start) >= 20;
    if (time.end < time.start || time.end === time.start) {
      return false;
    }
  }
  return true;
});

$.validator.addMethod('min20', function (value, element) {
  if (time.start !== null) {
    subtimer = (time.end - time.start) < 20;
    if (subtimer) {
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

function fmtMSS(s) {
  var a = s.split(':');
  return (+a[0]) * 60 * 60 + (+a[1]);
}
