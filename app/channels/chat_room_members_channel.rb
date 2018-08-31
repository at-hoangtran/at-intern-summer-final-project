class ChatRoomMembersChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_room_members'
  end
end
