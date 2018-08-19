include TimersHelper

class TimerData
  def self.add(e)
    timer = format_m_to_s(format_time_sounds(e.period))
    hash_tmp = {
      id: e.id,
      start_at: e.start_at,
      end_at: e.end_at,
      period: timer,
      step: e.step,
      status: e.status,
      product_id: e.product_id,
      product_name: e.product.name,
      product_price: e.product.price,
      product_description: e.product.description,
      product_quantity: e.product.quantity,
      product_image: e.product.images,
      product_category: e.product.category.ancestors.pluck(:id).last
    }
    $redis.set(e.id, hash_tmp.to_json)
  end

  def self.update(obj, crr)
    timer = JSON.load($redis.get(crr.id))
    if obj.run?
      if timer.nil? || crr.waiting?
        obj.id = crr.id
        TimerData.add(obj)
      end
    else
      ActionCable.server.broadcast("redirect_home_#{crr.id}",
                                   obj: 3)
      $redis.del(crr.id) unless timer.nil?
    end
  end

  def self.delete(obj)
    $redis.del(obj.id)
  end

  def self.delete_all
    timer = $redis.keys('*')
    timer.each do |key|
      $redis.del key
    end
    TimerData.load_data_db_to_redis
  end

  def self.load_data_db_to_redis
    @timer = Timer.all.includes(:product)
    @timer.each do |e|
      timer_id = $redis.get(e.id)
      timer    = format_m_to_s(format_time_sounds(e.period))
      hash_tmp = {
        id: e.id,
        start_at: e.start_at,
        end_at: e.end_at,
        period: timer,
        step: e.step,
        status: e.status,
        product_id: e.product_id,
        product_name: e.product.name,
        product_price: e.product.price,
        product_quantity: e.product.quantity,
        product_description: e.product.description,
        product_image: e.product.images,
        product_category: e.product.category.ancestors.pluck(:id).last
      }
      $redis.set(e.id, hash_tmp.to_json) if timer_id.nil?
    end
  end
end
