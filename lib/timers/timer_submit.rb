require 'timers/timer_auction_db'

class TimerSubmit
  def submit(timer)
    auction_db = TimerAuctionDb.new
    auction_db.close_auction(timer)
    auction_db.user_win(timer)
  end
end
