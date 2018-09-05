class ChatRoomAdmins < ActiveRecord::Migration[5.0]
  def change
    create_table :chat_room_admins do |t|
      t.references :user, foreign_key: true
      t.string :message
      t.integer :admin, default: 0
      t.integer :view, default: 0
      t.timestamps
    end
  end
end

