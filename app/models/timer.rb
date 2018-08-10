class Timer < ApplicationRecord
  acts_as_paranoid
  belongs_to :product
  has_many :auctions, dependent: :destroy
end
