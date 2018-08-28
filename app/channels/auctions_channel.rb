class AuctionsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'auctions'
  end
end
