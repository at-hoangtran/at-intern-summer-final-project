class TimerAuctionDb
  def create_auction(timer)
    timer_id   = timer['id']
    product_id = timer['product_id']

    auction = Auction.all.timer_product(timer_id, product_id)

    auction_size = auction.size

    if auction_size.positive?
      auction = auction.first
      if auction.finished?
        Auction.create!(
          product_id: product_id,
          timer_id: timer_id
        )
      end
    else
      Auction.create!(
        product_id: product_id,
        timer_id: timer_id
      )
    end
  end

  def close_auction(timer)
    timer_id   = timer['id']
    product_id = timer['product_id']
    auction = Auction.all.timer_product(timer_id, product_id)
    auction = auction.first
    auction.update_attribute(:status, :finished)
  end

  def user_win(timer)
    timer_id   = timer['id']
    product_id = timer['product_id']
    auction = Auction.timer_product(timer_id, product_id)
    auction = auction.first
    auction_dls = auction.auction_details.first
    unless auction_dls.nil?
      auction_dls.update_attribute(:status, :win)
      ActionCable.server.broadcast("auction_finish_#{timer_id}", obj: auction_dls.user_id)
    end
  end
end
