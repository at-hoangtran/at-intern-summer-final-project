class RenameColumnToOrders < ActiveRecord::Migration[5.0]
  def change
    rename_column :orders, :type, :type_payment
  end
end
