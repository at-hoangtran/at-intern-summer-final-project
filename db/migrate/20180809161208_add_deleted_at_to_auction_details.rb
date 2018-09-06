class AddDeletedAtToAuctionDetails < ActiveRecord::Migration[5.0]
  def change
    add_column :auction_details, :deleted_at, :datetime
    add_index :auction_details, :deleted_at
  end
end
