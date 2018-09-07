var notify_messages = {
  initOnLoad: function(data){
    notify_messages.check_view_message(data);
  },
  check_view_message: function(data) {
    user_id = $('#chat_admin').attr('user-id');
    if (data.admin == 1 && data.view == 0) {
      if (user_id !== '') {
        notify_messages.check_message(data.chat_id);
      } else {
        count = parseInt($('.notify-admin-text').html());
        $('.notify-admin-text').html(count += 1);
      }
    }
  },
  check_message: function(id) {
    $.ajax({
      url: '/admin/check_message_view/' + id,
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      success: function (response) {
        console.log(response);
      },
      error: function (err) {
        console.log(err);
      }
    });
  }
}
;
