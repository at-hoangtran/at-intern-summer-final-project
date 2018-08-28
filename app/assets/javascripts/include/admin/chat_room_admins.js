var box_chat_admins = {
  user_id: null,
  initOnLoad: function() {
    box_chat_admins.event_load_messages();
    box_chat_admins.event_sent();
    box_chat_admins.event_close();
  },
  tokenForm: function() {
    var token = $('meta[name="csrf-token"]').attr('content');
    return token;
  },
  event_load_messages: function() {
    $('.box-messages').on('click', function(){
      user_id = $(this).attr('user-id');
      box_chat_admins.load_messages(user_id);
      $('#ChatModal').attr('user-id', user_id);
    });
  },
  load_messages: function(user_id) {
    $('input.message_input.admin').val('');
    messages = box_chat_admins.request_message(user_id);
    html = '';
    image_default = '/assets/no-avatar-4ace913041f8df740dfa0e760b1bf90a7e90f0ecc973cc86d5ed1c8799a469ae.png';
    image_admin = '/assets/avart-admin-01ecef1eec00559d671b50e3425beb5264f4090961ce2dcaca549414f672c84b.png'
    var template = $('#data-chat-admin').html();
    if (template) {
      $.each(messages, function (i, item) {
        avatar = item.user.avatar.thumb.url
          ? item.user.avatar.thumb.url : image_default
        name = item.user.name;
        if (item.admin == 1) {
          avatar = image_admin;
          name = 'Quản trị viên';
        }
        html += Mustache.render(template, {
          NAME: name,
          IMAGE: avatar,
          MESSAGE: item.message,
          DATETIME: box_chat_admins.formatDateTime(item.created_at)
        });
      });
      $('.message_template.admin').html(html);
      setTimeout(function(){
        box_chat_admins.scroll_top();
      }, 300);
    }
  },
  event_sent: function() {
    $('.send_message.admin').on('click', function(){
      box_chat_admins.sent();
    });

    $('input.message_input.admin').keypress(function(e){
      if (e.which == 13) {
        box_chat_admins.sent();
      }
    });
  },
  sent: function() {
    value = $('input.message_input.admin').val();
    if (value) {
      if (value.length < 47) {
        box_chat_admins.request_sent();
        $('input.message_input.admin').val('');
      } else {
        swal({
          text: 'Nội dung không quá 47 ký tự !',
          timer: 2000
        })
      }
    }
  },
  request_message: function(user_id) {
    messages = null;
    $.ajax({
      url: '/admin/request_messages_user/' + user_id,
      method: 'get',
      async: false,
      success: function(res){
        messages = res;
      },
      statusCode: {
        400: function(){
          box_chat_admins.not_enough_notify();
        }
      }
    });
    return messages;
  },
  request_sent:function() {
    $.ajax({
      url: '/admin/chat_room_admins',
      method: 'post',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', box_chat_admins.tokenForm())},
      data: {
        user_id: user_id,
        message: $('input.message_input.admin').val()
      },
      success: function(res){
        console.log(res);
      },
      statusCode: {
        400: function(){
          box_chat_admins.not_enough_notify();
        }
      }
    });
  },
  event_close: function() {
    $("#ChatModal").on('hide.bs.modal', function () {
      $('#ChatModal').attr('user-id', '');
    });
  },
  scroll_top: function() {
    height = $('.message_template.admin').height();
    $('.messages.admin').animate({scrollTop: height});
  },
  not_enough_notify: function() {
    $('.top-right').notify({
      message: { text: 'Thao tác thất bại !' }
    }).show();
  },
  formatDateTime: function(datetime) {
    var date = new Date(datetime);
    dateTime = moment(date).format("DD/MM/YYYY HH:mm:ss");
    return dateTime;
  }
}

$(document).ready(function(){
  box_chat_admins.initOnLoad();
});
