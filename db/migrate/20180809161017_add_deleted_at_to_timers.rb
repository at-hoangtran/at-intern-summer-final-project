class AddDeletedAtToTimers < ActiveRecord::Migration[5.0]
  def change
    add_column :timers, :deleted_at, :datetime
    add_index :timers, :deleted_at
  end
end
