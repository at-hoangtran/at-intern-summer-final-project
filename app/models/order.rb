class Order < ApplicationRecord
  acts_as_paranoid
  PHONE_REGEX = /\A(?:\+?\d{1,3}\s*-?)?\(?(?:\d{3})?\)?[- ]?\d{3}[- ]?\d{4}\z/

  has_many :line_items, dependent: :destroy
  belongs_to :user

  enum status: %i[cart notdefined defined cancel]
  enum type_payment: %i[default online]

  default_scope -> { order(created_at: :desc) }
  scope :search_name, ->(search) { where 'name iLIKE ?', "%#{search}%" }
  scope :search_price, ->(min, max) { where 'total_price BETWEEN ? AND ?', min, max }
  scope :search_day, ->(minday, maxday) { where 'created_at BETWEEN ? AND ?', minday, maxday }
  scope :search_status, ->(status) { where 'status = ?', status }
  scope :search_type_payment, ->(type_payment) { where 'type_payment = ?', type_payment }
  scope :not_cart, -> { where.not status: :cart }
  scope :cart, -> { where status: :cart }
end
