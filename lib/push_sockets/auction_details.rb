class AuctionDetails
  def self.push(timer)
    ActionCable.server.broadcast("auction_#{timer['id']}", obj: timer)
  end
end
