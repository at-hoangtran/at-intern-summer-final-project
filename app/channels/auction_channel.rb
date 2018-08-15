class AuctionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "auction_#{params[:timer_id]}"
  end

  def receive(data)
    ActionCable.server.broadcast("auction_#{params[:timer_id]}", obj: data['message'])
  end
end
