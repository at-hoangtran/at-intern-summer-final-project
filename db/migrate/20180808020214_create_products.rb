class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.integer :price
      t.integer :quantity
      t.string :description
      t.string :images, array: true
      t.references :category, foreign_key: true
      t.timestamps
    end
  end
end
