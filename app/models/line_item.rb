class LineItem < ApplicationRecord
  acts_as_paranoid

  belongs_to :product
  belongs_to :order

  validates :amount, presence: true

  scope :by_order_id, ->(id) { where order_id: id }
end
