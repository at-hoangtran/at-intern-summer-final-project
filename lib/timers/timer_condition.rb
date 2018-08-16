require 'timers/timer_action'

class TimerCondition
  def main(key, arr)
    timer_action = TimerAction.new
    ktimer = JSON.load($redis.get(key))
    if ktimer['status'] == 'run' && ktimer['product_quantity'].positive?
      timer_action.sub_timer(key)
      timer_action.end_timer(key)
      key = JSON.load($redis.get(key))
      arr << key
    end
  end
end
