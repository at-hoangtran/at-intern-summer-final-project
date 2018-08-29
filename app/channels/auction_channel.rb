require 'auctions/auction_sk'

class AuctionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "auction_#{params[:timer_id]}"
  end

  def receive(data)
    Auction_sk.bid(data, params[:timer_id])
  end
end
