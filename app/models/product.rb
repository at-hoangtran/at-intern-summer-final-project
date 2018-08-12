class Product < ApplicationRecord
  acts_as_paranoid

  belongs_to :user
  belongs_to :category
  has_many :timers, dependent: :destroy
  has_many :auctions, dependent: :destroy

  default_scope -> { order(created_at: :desc) }
  scope :search_name, ->(search) { where 'name like ?', "%#{search}%" }
  scope :by_category_id, ->(id) { where category_id: id }
  scope :by_remove_not_status, -> { where.not status: :remove }
  scope :by_not_buy, -> { where.not status: :nobuy }
  scope :by_quantiry, ->(quantity) { where 'quantity > ?', quantity }

  enum status: %i[nobuy buy]

  validates :name, presence: true
  validates :description, presence: true
  validates :category_id, presence: true

  mount_uploaders :images, ImageUploader

  def self.import(file)
    spreadsheet = open_spreadsheet(file)
    header = spreadsheet.row(1)
    (2..spreadsheet.last_row).each do |i|
      row = Hash[[header, spreadsheet.row(i)].transpose]
      product = new
      product.attributes = row.to_hash.slice(*row.to_hash.keys)
      product.save
    end
  end

  def self.open_spreadsheet(file)
    case File.extname(file.original_filename)
    when '.xls' then Roo::Excel.new(file.path)
    when '.xlsx' then Roo::Excelx.new(file.path)
    else raise "Unknown file type: #{file.original_filename}"
    end
  end
end
