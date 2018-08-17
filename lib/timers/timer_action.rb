require 'timers/timer_submit'

class TimerAction
  def sub_timer(key)
    timer = JSON.load($redis.get(key))
    timer['period'] = timer['period'] - 1
    $redis.set(key, timer.to_json)
  end

  def end_timer(key)
    timer = JSON.load($redis.get(key))
    period = timer['period']
    if period.negative?
      timer_submit = TimerSubmit.new
      timer_submit.submit(timer)
      reset_timer_price(timer)
    end
  end

  def reset_timer_price(timer)
    timer['period'] = load_period_default(timer['id'])
    timer['product_price'] = load_price_defailt(timer['id'])
    $redis.set(timer['id'], timer.to_json)
  end

  def load_period_default(id)
    timer = Timer.find(id)
    format_m_to_s(format_time_sounds(timer.period))
  end

  def load_price_defailt(id)
    timer = Timer.find(id)
    timer.product.price
  end
end
