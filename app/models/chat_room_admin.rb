class ChatRoomAdmin < ApplicationRecord
  acts_as_paranoid
  belongs_to :user

  scope :by_not_view_admin, -> { where 'view = ? and admin = ?', 0, 0 }
end
