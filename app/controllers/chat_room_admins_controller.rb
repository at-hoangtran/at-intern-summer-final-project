class ChatRoomAdminsController < ApplicationController
  def index
    @chat_room = ChatRoomAdmin.where(user_id: current_user.id)
    respond_to do |format|
      format.json do
        render json: @chat_room.as_json(
          only: %i[id message admin view created_at],
          include: [
            { user: { only: %i[id name avatar] } }
          ]
        )
      end
    end
  end

  def create
    user = User.find_by(id: params[:user_id])
    datetime = format_day_time(DateTime.now)

    @chat = user.chat_room_admins.build(
      message: params[:message],
      admin: 0,
      view: 0
    )

    @chat.save

    value = {
      chat_id: @chat.id,
      user_id: user.id,
      name: user.name,
      avatar: user.avatar,
      message: params[:message],
      datetime: datetime,
      admin: 0,
      view: 0
    }

    ActionCable.server.broadcast("chat_room_admin_#{user.id}",
                                 obj: value)
    respond_to do |format|
      format.json { render json: true }
    end
  end
end
