class ChatRoomMembersController < ApplicationController
  def index
    keys = $redis_chat.keys
    arr = []
    keys.each do |e|
      arr << JSON.load($redis_chat.get(e))
    end
    respond_to do |format|
      format.json { render json: arr }
    end
  end

  def create
    user     = User.find_by(id: params[:user_id])
    datetime = format_day_time(DateTime.now)

    value = {
      name: user.name,
      avatar: user.avatar,
      message: params[:message],
      datetime: datetime
    }

    $redis_chat.set(datetime, value.to_json, ex: 10 * 60)
    ActionCable.server.broadcast('chat_room_members',
                                 obj: value)
    respond_to do |format|
      format.json { render json: true }
    end
  end
end
