require 'actions/action'

class AuctionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "auction_#{params[:timer_id]}"
  end

  def receive(data)
    Action.bid(data, params[:timer_id])
  end
end
