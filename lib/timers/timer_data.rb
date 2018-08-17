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
      product_category: e.product.category_id
    }
    $redis.set(e.id, hash_tmp.to_json)
  end

  def self.update(obj, crr)
    timer = JSON.load($redis.get(crr.id))
    timer = format_m_to_s(format_time_sounds(obj.period))

    if crr.waiting? && obj.run?
      timer['start_at']            = obj.start_at
      timer['end_at']              = obj.end_at
      timer['product_id']          = obj.product_id
      timer['product_name']        = obj.product.name
      timer['product_price']       = obj.product.price
      timer['product_description'] = obj.product.description
      timer['product_quantity']    = obj.product.quantity
      timer['product_image']       = obj.product.images
      timer['product_category']    = obj.product.category_id
      timer['period']              = timer
    end

    timer['status'] = obj.status
    $redis.set(crr.id, timer.to_json)
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
        product_category: e.product.category_id
      }
      $redis.set(e.id, hash_tmp.to_json) if timer_id.nil?
    end
  end
end
