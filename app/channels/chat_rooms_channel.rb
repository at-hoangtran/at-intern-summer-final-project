class ChatRoomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_rooms'
  end
end
