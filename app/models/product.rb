class Product < ApplicationRecord
  belongs_to :user
  belongs_to :category

  default_scope ->{order(created_at: :desc)}
  scope :search_name, -> search {where "name like ?", "%#{search}%"}
  scope :by_category_id, ->(id){where category_id: id}
  scope :by_remove_not_status, -> {where.not status: :remove}
  scope :by_not_buy, -> {where.not status: :nobuy}
  scope :by_quantiry, -> (quantity){where "quantity > ?", quantity}

  enum status: [:nobuy, :buy, :remove]

  validates :name, presence: true
  validates :description, presence: true
  validates :category_id, presence: true

  serialize :images, Array
  mount_uploaders :images, ImageUploader
end
