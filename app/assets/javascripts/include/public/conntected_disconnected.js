var conntected_disconnected = {
  conntected: function() {
    console.log('conntected.');
  },
  disconnected: function() {
    swal(
      'Mất kết nối',
      'Vui lòng kiểm tra lại',
      'warning'
    )
  },
  load_id_current_user: function () {
    user_id = null;
    $.ajax({
      url: '/current_user',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      async: false,
      success: function (response) {
        user_id = response;
      },
      error: function (err) {
        console.log(err);
      }
    });
    return user_id;
  }
}
