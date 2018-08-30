class LineItem < ApplicationRecord
  acts_as_paranoid

  belongs_to :product
  belongs_to :order, dependent: :destroy

  validates :amount, presence: true

  default_scope -> { order(created_at: :desc) }
  scope :by_order_id, ->(id) { where order_id: id }
  scope :by_status_cart, ->(id) { where status: 0 }
end
