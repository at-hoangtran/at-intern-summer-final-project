namespace :after_start do
  desc 'TODO'
  task setIntervel: :environment do
    set_interval(1) do |n|
      key_timer = $redis.keys('*')
      key_timer.each do |key|
        key_timer = JSON.load($redis.get(key))
        ActionCable.server.broadcast("auction_#{key}", obj: key_timer)
      end
    end
  end
end
