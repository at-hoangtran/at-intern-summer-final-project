class MessageBidChannel < ApplicationCable::Channel
  def subscribed
    stream_from "message_bid_#{params[:timer_id]}_user_#{params[:user_id]}"
  end
end
