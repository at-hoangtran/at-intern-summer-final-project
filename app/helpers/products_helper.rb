module ProductsHelper
  def select_categories(obj)
    obj.select :category_id, options_for_select(load_categories, selected: obj.object.category_id), {}, id: 'category_id', class: 'form-control'
  end

  def select_status(obj)
    obj.select :status, options_for_select([['Đang Bán', :buy], ['Ừng Bán', :nobuy]], selected: (obj.object.buy? == true ? :buy : :nobuy)), {}, id: 'status', class: 'form-control'
  end
end
