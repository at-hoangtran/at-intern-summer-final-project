class HelpersRb
  def self.set_interval(delay)
    mutex = Mutex.new
    Thread.new do
      mutex.synchronize do
        loop do
          sleep delay
          yield
        end
      end
    end
  end

  def self.check_time(time_start, time_end)
    time_start = Time.parse(Time.parse(time_start).strftime('%H:%M'))
    time_end   = Time.parse(Time.parse(time_end).strftime('%H:%M'))
    time_now   = Time.now
    return true if time_now >= time_start && time_now <= time_end
    false
  end

  def self.format_time_sounds(time)
    time.strftime('%M:%S')
  end

  def self.format_m_to_s(timer)
    timer.split(':').map { |a| a.to_i }.inject(0) { |a, b| a * 60 + b }
  end

  def self.format_day_time(daytime)
    daytime.strftime('%d/%m/%Y - %H:%M:%S')
  end
end
