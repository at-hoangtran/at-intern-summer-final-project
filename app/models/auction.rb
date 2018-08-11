class Auction < ApplicationRecord
  acts_as_paranoid
  belongs_to :product
  belongs_to :timer
  has_many :auction_details, dependent: :destroy
end
