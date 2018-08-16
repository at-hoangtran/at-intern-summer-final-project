require 'timers/timer_submit'

class TimerAction
  def sub_timer(key)
    key_timer = JSON.load($redis.get(key))
    key_timer['period'] = key_timer['period'] - 1
    $redis.set(key, key_timer.to_json)
  end

  def end_timer(key)
    key_timer = JSON.load($redis.get(key))
    period = key_timer['period']
    if period.negative?
      timer_submit = TimerSubmit.new
      timer_submit.submit
      reset_timer_price(key_timer)
    end
  end

  def reset_timer_price(key_timer)
    key_timer['period'] = load_period_default(key_timer['id'])
    key_timer['product_price'] = load_price_defailt(key_timer['id'])
    $redis.set(key_timer['id'], key_timer.to_json)
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
