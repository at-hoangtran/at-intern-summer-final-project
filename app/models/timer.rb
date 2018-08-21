class Timer < ApplicationRecord
  acts_as_paranoid
  after_destroy :destroy_redis
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
  def destroy_redis
    ActionCable.server.broadcast("redirect_home_#{self.id}",
                                 obj: 3)
    $redis.del(self.id)
  end
end
