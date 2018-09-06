class CountOrderChannel < ApplicationCable::Channel
  def subscribed
    stream_from "count_order_#{params[:user_id]}"
  end
end
