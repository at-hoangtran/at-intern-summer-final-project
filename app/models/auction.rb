class Auction < ApplicationRecord
  acts_as_paranoid
  belongs_to :product
  belongs_to :timer
  has_many :auction_details, dependent: :destroy

  default_scope -> { order(created_at: :desc) }
  scope :search_name, ->(search) { where 'name iLIKE ?', "%#{search}%" }
  scope :search_time, ->(mintime, maxtime) { where 'start_at BETWEEN ? AND ?', mintime, maxtime }
  scope :search_day, ->(minday, maxday) { where 'created_at BETWEEN ? AND ?', minday, maxday }
  scope :search_status, ->(status) { where 'status = ?', status }
  scope :timer_product, ->(timer_id, product_id) {
    where timer_id: timer_id, product_id: product_id
  }
  enum status: %i[running finished]
end
