class CreateAuctions < ActiveRecord::Migration[5.0]
  def change
    create_table :auctions do |t|
      t.references :product, foreign_key: true
      t.integer :status, default: 0
      t.timestamps
    end
  end
end
