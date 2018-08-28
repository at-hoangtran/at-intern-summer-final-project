class Admin::ChatRoomAdminsController < ApplicationAdminController
  def index
    @chat_room = ChatRoomAdmin.group(:user_id).pluck(:user_id)
  end

  def create
    user = User.find_by(id: params[:user_id])
    datetime = format_day_time(DateTime.now)

    @chat = user.chat_room_admins.build(
      message: params[:message],
      admin: 1,
      view: 1
    )

    @chat.save

    value = {
      chat_id: @chat.id,
      user_id: user.id,
      name: user.name,
      avatar: user.avatar,
      message: params[:message],
      datetime: datetime,
      admin: 1,
      view: 1
    }

    ActionCable.server.broadcast("chat_room_admin_#{user.id}",
                                 obj: value)
    respond_to do |format|
      format.json { render json: true }
    end
  end

  def request_all_id_user
    user_id = User.all.pluck(:id)
    respond_to do |format|
      format.json { render json: user_id }
    end
  end

  def request_messages_user
    @chat_room = ChatRoomAdmin.where(user_id: params[:id])
    check_messages_view
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

  def check_message_view
    chat_room = ChatRoomAdmin.find_by(id: params[:id])
    chat_room.update_attribute(:view, 1)
    respond_to do |format|
      format.json { render json: true }
    end
  end

  private

    def check_messages_view
      chat_room = ChatRoomAdmin.where(user_id: params[:id])
      chat_room.each do |e|
        e.update_attribute(:view, 1)
      end
    end
end