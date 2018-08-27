$(document).on('turbolinks:load', function() {
  user_id = all_user_id();
  for (var i = 0; i < user_id.length; i++) {
    App.auction = App.cable.subscriptions.create(
      {
        channel: 'ChatRoomAdminsChannel',
        user_id: user_id[i],
      },
      {
        received: function(data) {
          data = data.obj;
          image_default = '/assets/no-avatar-4ace913041f8df740dfa0e760b1bf90a7e90f0ecc973cc86d5ed1c8799a469ae.png';
          image_admin = '/assets/avart-admin-01ecef1eec00559d671b50e3425beb5264f4090961ce2dcaca549414f672c84b.png'
          avatar = data.avatar.thumb.url
            ? data.avatar.thumb.url : image_default
          name = data.name;
          if (data.admin == 1) {
            avatar = image_admin;
            name = 'Quản trị viên';
          }
          html = '';
          html += '<li class="message">';
          html += '<div class="avatar">';
          html += '<img class="no-avatar" src="'+ avatar +'">';
          html += '</div>';
          html += '<div class="text_wrapper">';
          html += '<div class="text">'+ data.message +'</div>';
          html += '<div class="text_details">'+ data.datetime +'</div>';
          html += '<span class="name">'+ name +'</span>';
          html += '</div>';
          $('.message_template.admin').append(html);
          height = $('.message_template.admin').height();
          $('.messages.admin').animate({scrollTop: height});
          notify_messages.initOnLoad(data);
        }
      }
    );
  }

  function all_user_id() {
    user_id = null;
    $.ajax({
      url: '/admin/request_all_id_user',
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
});
