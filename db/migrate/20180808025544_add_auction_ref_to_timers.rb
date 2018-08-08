class AddAuctionRefToTimers < ActiveRecord::Migration[5.0]
  def change
    add_reference :timers, :auction, foreign_key: true
  end
end
