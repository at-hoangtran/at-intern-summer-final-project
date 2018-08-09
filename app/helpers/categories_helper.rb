module CategoriesHelper
  def load_categories
    (@categories.collect{ |u| [u.name, u.id]} << ["No parent", nil]).reverse
  end
end

