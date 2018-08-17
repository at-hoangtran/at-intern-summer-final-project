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
    product = auction.product
    auction_dls = auction.auction_details.first
    unless auction_dls.nil?
      auction_dls.update_attribute(:status, :win)
      sub_quantity(product, timer)
      create_order(product, auction_dls)
      ActionCable.server.broadcast("auction_finish_#{timer_id}", obj: auction_dls.user_id)
    end
  end

  def sub_quantity(product, timer)
    quantity = product.quantity
    product.update_attribute(:quantity, quantity - 1)
    timer['product_quantity'] = timer['product_quantity'] - 1
    $redis.set(timer['id'], timer.to_json)
  end

  def create_order(product, auction_dls)
    order = Order.cart.find_by(user_id: auction_dls.user_id)
    if order.nil?
      order = Order.new
      order.user_id = auction_dls.user_id
      order.save
      create_line_item(order, product, auction_dls)
    else
      create_line_item(order, product, auction_dls)
    end
  end

  def create_line_item(order, product, auction_dls)
    order.line_items.create!(
      product_id: product.id,
      amount: auction_dls.bid
    )
  end
end
