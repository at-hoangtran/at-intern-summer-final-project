class BidChannel < ApplicationCable::Channel
  def subscribed
    stream_from "bid_#{params[:timer_id]}"
  end
end
