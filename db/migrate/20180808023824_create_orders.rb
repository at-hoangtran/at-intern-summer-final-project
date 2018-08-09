class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.references :user, foreign_key: true
      t.string :address, nil: false
      t.string :phone, nil: false
      t.integer :total_price, nil: false
      t.integer :status, default: 0
      t.timestamps
    end
  end
end
