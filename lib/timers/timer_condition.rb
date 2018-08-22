require 'timers/timer_action'
require 'timers/timer_auction_db'
require 'push_sockets/auction_details'

class TimerCondition
  def main(key, arr)
    timer_action = TimerAction.new
    timer_auction_db = TimerAuctionDb.new
    timer = JSON.load($redis.get(key))

    if timer['status'] == 'run'
      # if HelpersRb.check_time(timer['start_at'], timer['end_at'])
      if timer['product_quantity'].positive?
        timer_auction_db.create_auction(timer)
        timer_action.sub_timer(timer)
        timer_action.end_timer(timer)
        AuctionDetails.push(timer)
        arr << timer
      else
        timer_model = Timer.find_by(id: timer['id'])
        timer_model.update_attribute(:status, :waiting)
        $redis.del(timer['id'])
        ActionCable.server.broadcast("redirect_home_#{timer_model.id}",
                                     obj: 1)
      end
      # else
      #   ActionCable.server.broadcast("redirect_home_#{timer['id']}",
      #     obj: 2)
      # end
    end
  end
end
