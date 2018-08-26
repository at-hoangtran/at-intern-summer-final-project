$(document).on('turbolinks:load', function() {
  App.chat_room_members = App.cable.subscriptions.create('ChatRoomMembersChannel', {
    received: function(data) {
      data = data.obj;
      image_default = '/assets/no-avatar-4ace913041f8df740dfa0e760b1bf90a7e90f0ecc973cc86d5ed1c8799a469ae.png';
      images = data.avatar.thumb.url
        ? data.avatar.thumb.url : image_default
      html = '';
      html += '<li class="message">';
      html += '<div class="avatar">';
      html += '<img class="no-avatar" src="'+ images +'">';
      html += '</div>';
      html += '<div class="text_wrapper">';
      html += '<div class="text">'+ data.message +'</div>';
      html += '<div class="text_details">'+ data.datetime +'</div>';
      html += '<span class="name">'+ data.name +'</span>';
      html += '</div>';
      $('.message_template.member').append(html);
      box_chat_member.scroll_top();
    }
  });
});
