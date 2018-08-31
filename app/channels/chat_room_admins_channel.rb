class ChatRoomAdminsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_room_admin_#{params[:user_id]}"
  end
end
