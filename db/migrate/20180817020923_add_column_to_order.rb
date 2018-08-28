class AddColumnToOrder < ActiveRecord::Migration[5.0]
  def change
    add_column :orders, :user_name, :string
  end
end
