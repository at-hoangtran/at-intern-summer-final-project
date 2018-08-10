class CreateAuctionDetails < ActiveRecord::Migration[5.0]
  def change
    create_table :action_details do |t|
      t.references :auction, foreign_key: true
      t.references :user, foreign_key: true
      t.integer :bid
      t.integer :status, default: 0, nil: false
      t.timestamps
    end
  end
end
