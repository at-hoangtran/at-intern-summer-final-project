require 'helpers_rb/helpers_rb'

class Auction_sk
  def self.bid(data, key)
    timer   = JSON.load($redis.get(key))
    auction = Auction.timer_product(key, timer['product_id'])
    auction = auction.first
    unless auction.nil?
      auction_dls = auction.auction_details.first
      user_id     = data['user_id'].to_i
      if auction_dls.nil?
        auction.auction_details.create!(
          user_id: user_id,
          bid: data['price']
        )
        Auction_sk.append_bid(key, auction)
        Auction_sk.set_auction(timer, data, key)
      else
        if auction_dls.user_id == user_id
          ActionCable.server.broadcast("message_bid_#{key}_user_#{auction_dls.user_id}", obj: auction_dls.bid)
        else
          auction_dl = auction.auction_details
          user = auction_dl.find_by(user_id: user_id)
          user_name = User.find_by(id: user_id)
          if user.nil?
            auction.auction_details.create!(
              user_id: user_id,
              bid: data['price']
            )
          else
            user.update_attributes(bid: data['price'], created_at: DateTime.now)
          end
          Auction_sk.loser_bid(auction_dls.user_id,
                               user_id, key, auction, data['price'])
          Auction_sk.append_bid(key, auction)
          Auction_sk.set_auction(timer, data, key)
        end
      end
    end
  end

  def self.set_auction(timer, data, key)
    timer['product_price'] = data['price']
    timer['period'] = 20 if timer['period'] < 20
    $redis.set(key, timer.to_json)
  end

  def self.append_bid(key, auction)
    auction_dls = auction.auction_details
    arr = []
    auction_dls.each do |obj|
      hash_tmp = {
        name: obj.user.name,
        bid: obj.bid,
        created_at: HelpersRb.format_day_time(obj.created_at)
      }
      arr << hash_tmp
    end
    ActionCable.server.broadcast("bid_#{key}", obj: arr)
  end

  def self.loser_bid(*obj)
    user = User.find_by(id: obj[1])
    ActionCable.server.broadcast("loser_bid_#{obj[0]}",
                                 obj: {
                                   id: obj[2],
                                   pro_n: obj[3].product.name,
                                   name: user.name,
                                   price: obj[4]
                                 })
  end
end
