class AddTimerRefToAuctions < ActiveRecord::Migration[5.0]
  def change
    add_reference :auctions, :timer, foreign_key: true
  end
end
