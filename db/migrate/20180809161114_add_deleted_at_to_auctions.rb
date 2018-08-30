class AddDeletedAtToAuctions < ActiveRecord::Migration[5.0]
  def change
    add_column :auctions, :deleted_at, :datetime
    add_index :auctions, :deleted_at
  end
end
