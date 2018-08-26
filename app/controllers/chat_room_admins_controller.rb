class ChatRoomAdminsController < ApplicationController
  def index
    @chat_room = ChatRoomAdmin.all
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

    value = {
      name: user.name,
      avatar: user.avatar,
      message: params[:message],
      datetime: datetime,
      admin: 0,
      view: 0
    }

    user.chat_room_admins.create!(message: params[:message])

    ActionCable.server.broadcast("chat_room_admin_#{user.id}",
                                 obj: value)
    respond_to do |format|
      format.json { render json: true }
    end
  end
end
