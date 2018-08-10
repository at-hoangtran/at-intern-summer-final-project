class CreateTimers < ActiveRecord::Migration[5.0]
  def change
    create_table :timers do |t|
      t.datetime :start_at, nil: false
      t.datetime :end_at, nil: false
      t.integer :period, nil: false
      t.integer :step, nil: false
      t.references :product, foreign_key: true
      t.timestamps
    end
  end
end
