class Timer < ApplicationRecord
  acts_as_paranoid
  belongs_to :product
  has_many :auctions, dependent: :destroy

  default_scope -> { order(created_at: :desc) }
  scope :search_time, ->(mintime, maxtime) { where 'start_at BETWEEN ? AND ?', mintime, maxtime }
  scope :search_status, ->(status) { where 'status = ?', status }

  enum status: %i[waiting run]
  validates :product_id, presence: true
  validates :start_at, presence: true
  validates :end_at, presence: true
  validates :period, presence: true
  validates :step, presence: true
end
