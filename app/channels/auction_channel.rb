require 'auctions/auction_response_bid'

class AuctionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "auction_#{params[:timer_id]}"
  end

  def receive(data)
    AuctionResponseBid.bid(data, params[:timer_id])
  end
end
