class RemoveColumnToOrders < ActiveRecord::Migration[5.0]
  def change
    remove_column :orders, :type_payment
    add_column :orders, :type_payment, :integer
  end
end
