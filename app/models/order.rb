class Order < ApplicationRecord
  acts_as_paranoid

  has_many :line_items, dependent: :destroy
  belongs_to :user

  enum status: %i[cart notdefined defined cancel]

  default_scope -> { order(created_at: :desc) }
  scope :search_name, ->(search) { where 'name like ?', "%#{search}%" }
  scope :search_price, ->(min, max) { where 'total_price BETWEEN ? AND ?', min, max }
  scope :search_day, ->(minday, maxday) { where 'created_at BETWEEN ? AND ?', minday, maxday }
  scope :search_status, ->(status) { where 'status = ?', status }
  scope :not_cart, -> { where.not status: :cart }
  scope :cart, -> { where status: :cart }
end
