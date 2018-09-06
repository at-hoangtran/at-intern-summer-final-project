module ProductsHelper
  def select_categories(obj)
    obj.select :category_id,
               options_for_select(load_categories, selected: obj.object.category_id),
               {},
               id: 'category_id', class: 'form-control'
  end

  def load_products
    (@products.collect { |u| [u.name, u.id] } << ['No parent', nil]).reverse
  end

  def set_name
    if params[:search].present?
      params[:search][:name] if params[:search][:name].present?
    end
  end

  def set_category
    if params[:search].present?
      params[:search][:category] if params[:search][:category].present?
    end
  end
end
