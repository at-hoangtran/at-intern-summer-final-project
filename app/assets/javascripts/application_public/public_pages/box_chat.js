var box_chat = {
  initOnLoad: function() {
    box_chat.load_messages();
    box_chat.event_sent();
  },
  tokenForm: function() {
    var token = $('meta[name="csrf-token"]').attr('content');
    return token;
  },
  load_messages: function() {
    $('.button-chat').on('click', function(){
      $('input.message_input').val('');
      messages = box_chat.request_message();
      html = '';
      image_default = '/assets/no-avatar-4ace913041f8df740dfa0e760b1bf90a7e90f0ecc973cc86d5ed1c8799a469ae.png';
      var template = $('#data-chat').html();
      if (template) {
        $.each(messages, function (i, item) {
          avatar = item.avatar.thumb.url ? item.avatar.thumb.url : image_default
          html += Mustache.render(template, {
            NAME: item.name,
            IMAGE: avatar,
            MESSAGE: item.message,
            DATETIME: item.datetime
          });
        });
        $('.message_template').html(html);
      }
      $("#ChatModal").on('shown.bs.modal', function () {
        box_chat.scroll_top();
      });
    });
  },
  event_sent: function() {
    $('.send_message').on('click', function(){
      box_chat.sent();
    });

    $('input.message_input').keypress(function(e){
      if (e.which == 13) {
        box_chat.sent();
      }
    });
  },
  sent: function() {
    value = $('input.message_input').val();
    if (value) {
      if (value.length < 47) {
        box_chat.request_sent();
        $('input.message_input').val('');
        box_chat.scroll_top();
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
      url: '/chat_rooms',
      method: 'get',
      async: false,
      success: function(res){
        messages = res;
      },
      statusCode: {
        400: function(){
          box_chat.not_enough_notify();
        }
      }
    });
    return messages;
  },
  request_sent:function() {
    $.ajax({
      url: '/chat_rooms',
      method: 'post',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', box_chat.tokenForm())},
      data: {
        user_id: conntected_disconnected.load_id_current_user(),
        message: $('input.message_input').val()
      },
      success: function(res){
        console.log(res);
      },
      statusCode: {
        400: function(){
          box_chat.not_enough_notify();
        }
      }
    });
  },
  scroll_top: function() {
    height = $('.message_template').height();
    $('.messages').animate({scrollTop: height});
  },
  not_enough_notify: function() {
    $('.top-right').notify({
      message: { text: 'Thao tác thất bại !' }
    }).show();
  }
}

$(document).on('turbolinks:load', function() {
  box_chat.initOnLoad();
});
