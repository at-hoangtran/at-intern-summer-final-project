var notify_messages = {
  initOnLoad: function(data){
    notify_messages.check_view_message(data);
    notify_messages.add_messages_append_box(data);
  },
  check_view_message: function(data) {
    user_id = $('#ChatModal').attr('user-id');
    if (data.admin == 0) {
      if (user_id !== null) {
        if (user_id == data.user_id) {
          // console.log('ok');
        }
      }
    }
  },
  add_messages_append_box: function(data) {
    html = '';
    user_id = $('#ChatModal').attr('user-id');
    if (data.admin == 0) {
      if (user_id != data.user_id) {
        html += '<li>';
        html += '<div class="col-md-3 col-sm-3 col-xs-3">';
        html += '<div class="notify-img">';
        html += '<img class="size-avatar" src="'+ data.avatar.thumb.url +'">';
        html += '</div>';
        html += '</div>';
        html += '<div class="col-md-9 col-sm-9 col-xs-9 pd-l0">';
        html += '<span class="name-user-ms">'+ data.name +'</span>';
        html += '<p class="message-notify">'+ data.message +'</p>';
        html += '<p class="time">'+ data.datetime +'</p>';
        html += '<hr class="notify">';
        html += '</div>';
        html += '</li>';
        $('.drop-content-notify').append(html);
        count = parseInt($('.count-notify').html());
        $('.count-notify').html(count += 1);
      }
    }
  }
}

