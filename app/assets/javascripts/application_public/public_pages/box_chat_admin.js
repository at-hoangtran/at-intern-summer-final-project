var box_chat_admin = {
  initOnLoad: function() {
    box_chat_admin.event_load_messages();
    box_chat_admin.event_sent();
    box_chat_admin.event_close();
  },
  tokenForm: function() {
    var token = $('meta[name="csrf-token"]').attr('content');
    return token;
  },
  event_load_messages: function() {
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href");
      if (target === '#chat_admin') {
        box_chat_admin.load_messages();
        $('#chat_admin').attr('user-id',
          conntected_disconnected.load_id_current_user());
      } else {
        box_chat_member.load_messages();
        $('#chat_admin').attr('user-id', '');
      }
    });
  },
  load_messages: function() {
    $('input.message_input.admin').val('');
    messages = box_chat_admin.request_message();
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
          DATETIME: box_chat_admin.formatDateTime(item.created_at)
        });
      });
      $('.message_template.admin').html(html);
    }
    box_chat_admin.scroll_top();
    $('.notify-admin-text').html(0);
  },
  event_sent: function() {
    $('.send_message.admin').on('click', function(){
      box_chat_admin.sent();
    });

    $('input.message_input.admin').keypress(function(e){
      if (e.which == 13) {
        box_chat_admin.sent();
      }
    });
  },
  sent: function() {
    value = $('input.message_input.admin').val();
    if (value) {
      if (value.length < 47) {
        box_chat_admin.request_sent();
        $('input.message_input.admin').val('');
      } else {
        swal({
          text: 'Nội dung không quá 47 ký tự !',
          timer: 2000
        })
      }
    }
  },
  request_message: function() {
    messages = null;
    $.ajax({
      url: '/chat_room_admins',
      method: 'get',
      async: false,
      success: function(res){
        messages = res;
      },
      statusCode: {
        400: function(){
          box_chat_member.not_enough_notify();
        }
      }
    });
    return messages;
  },
  request_sent:function() {
    $.ajax({
      url: '/chat_room_admins',
      method: 'post',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', box_chat_admin.tokenForm())},
      data: {
        user_id: conntected_disconnected.load_id_current_user(),
        message: $('input.message_input.admin').val()
      },
      success: function(res){
        console.log(res);
      },
      statusCode: {
        400: function(){
          box_chat_admin.not_enough_notify();
        }
      }
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
  event_close: function() {
    $("#ChatModal").on('hide.bs.modal', function () {
      $('#chat_admin').attr('user-id', '');
    });
  },
  formatDateTime: function(datetime) {
    var date = new Date(datetime);
    dateTime = moment(date).format("DD/MM/YYYY HH:mm:ss");
    return dateTime;
  }
}

$(document).ready(function() {
  box_chat_admin.initOnLoad();
});
