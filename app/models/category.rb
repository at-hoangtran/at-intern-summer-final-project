class Category < ApplicationRecord
  acts_as_paranoid

  has_many :products, dependent: :destroy
  belongs_to :parent, class_name: Category.name, optional: true
  has_many :children, class_name: Category.name, foreign_key: :parent_id, dependent: :destroy

  validates :name, presence: true

  scope :search_name, -> search {where "name like ?", "%#{search}%"}
  scope :by_name, ->(name){where name: name}
  scope :by_id_not_match, ->(id){where.not id: id}
  scope :by_parent_id_not_match, ->(parent_id){where.not parent_id: parent_id}
  scope :by_parent_id_status, -> {where parent_id: nil}

  def descendants
    children.inject(children) do |all, subcat|
      all + subcat.descendants
    end
  end

  def self_and_descendants
    [self] + descendants
  end

  def load_cat_parent_id
    Category.all.map(&:id).uniq - branch_ids
  end

  def load_cat_parent
    Category.where("id in (?)", load_cat_parent_id)
  end

  def branch_ids
    self_and_descendants.map(&:id).uniq
  end

  def prouduct_in_subcategory
    (Product.by_category_id(self.branch_ids).size) > 0 ? true : false
  end
end
