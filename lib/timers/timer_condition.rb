require 'timers/timer_action'
require 'timers/timer_auction_db'

class TimerCondition
  def main(key, arr)
    timer_action = TimerAction.new
    timer_auction_db = TimerAuctionDb.new
    ktimer = JSON.load($redis.get(key))
    if ktimer['status'] == 'run'
      if ktimer['product_quantity'].positive?
        timer_auction_db.create_auction(ktimer)
        timer_action.sub_timer(key)
        timer_action.end_timer(key)
        key = JSON.load($redis.get(key))
        arr << key
      else
        timer = Timer.find_by(id: ktimer['id'])
        timer.update_attribute(:status, :waiting)
        $redis.del(ktimer['id'])
        ActionCable.server.broadcast("redirect_home_#{timer.id}", obj: 0o1)
      end
    end
  end
end
