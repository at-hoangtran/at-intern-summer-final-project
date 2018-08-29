class CreateTimers < ActiveRecord::Migration[5.0]
  def change
    create_table :timers do |t|
      t.time :start_at, nil: false
      t.time :end_at, nil: false
      t.time :period, nil: false
      t.integer :step, nil: false
      t.references :product, foreign_key: true
      t.integer :status, default: 0
      t.timestamps
    end
  end
end
