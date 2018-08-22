require 'helpers_rb/helpers_rb'
require 'timers/timer_condition'
require 'timers/timer_data'

namespace :start do
  desc 'TODO'
  task setIntervel: :environment do
    HelpersRb.set_interval(1) do |n|
      arr = []
      key_timer = $redis.keys('*')
      key_timer.each do |key|
        TimerCondition.new.main(key, arr)
      end
      ActionCable.server.broadcast 'auctions',
                                     obj: arr
    end
  end
end
