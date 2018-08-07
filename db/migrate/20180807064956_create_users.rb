class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :remember_digest
      t.string :activation_digest
      t.boolean :activated
      t.datetime :activated_at
      t.string :role
      t.string :reset_digest
      t.datetime :reset_send_at
      t.string :address
      t.string :phone


      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :phone, unique: true
  end
end
