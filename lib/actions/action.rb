class Action
  def self.bid(data, key)
    key_timer = JSON.load($redis.get(key))
    key_timer['product_price'] = data['price']
    key_timer['period'] = 20 if key_timer['period'] < 20
    $redis.set(key, key_timer.to_json)
  end
end
