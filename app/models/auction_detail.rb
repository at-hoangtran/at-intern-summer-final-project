class AuctionDetail < ApplicationRecord
  acts_as_paranoid
  belongs_to :user
  belongs_to :auction

  default_scope -> { order(bid: :desc) }
  scope :by_auction_detail_id, ->(id) { where auction_id: id }
  enum status: %i[loser win]
end
