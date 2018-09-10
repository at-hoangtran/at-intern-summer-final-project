require 'timers/timer_action'
require 'timers/timer_auction_db'
require 'push_sockets/auction_details'

class TimerCondition
  def main(key, arr)
    timer_action = TimerAction.new
    timer_auction_db = TimerAuctionDb.new
    timer = JSON.load($redis.get(key))

    check = true

    if timer['status'] == 'run'
      timer_ctr = HelpersRb.check_time(timer['start_at'],
                                       timer['end_at'])

      unless (timer_ctr)
        unless timer['status_auction'].nil?
          if (timer['status_auction'].zero?)
            check = true
          else
            check = false
          end
        else
          check = false
        end
      end

      if(check)
        if timer['product_quantity'].positive?
          timer_auction_db.create_auction(timer)
          timer_action.sub_timer(timer)
          timer_action.end_timer(timer)
          AuctionDetails.push(timer)
          arr << timer
        else
          timer_model = timer_auction_db.set_status_waiting(timer)
          ActionCable.server.broadcast("redirect_home_#{timer_model.id}", obj: 1)
        end
      else
        timer_auction_db.set_status_waiting(timer) unless timer['product_quantity'].positive?
        ActionCable.server.broadcast("redirect_home_#{timer['id']}", obj: 2)
      end
    end
  end
end
