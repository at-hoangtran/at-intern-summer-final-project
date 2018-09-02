class AddDeletedAtToChatRoomAdmins < ActiveRecord::Migration[5.0]
  def change
    add_column :chat_room_admins, :deleted_at, :datetime
    add_index :chat_room_admins, :deleted_at
  end
end
