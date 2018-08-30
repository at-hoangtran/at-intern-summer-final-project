class LoserBidChannel < ApplicationCable::Channel
  def subscribed
    stream_from "loser_bid_#{params[:user_id]}"
  end
end
