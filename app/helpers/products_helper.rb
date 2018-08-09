module ProductsHelper
  def select_categories f
    f.select :category_id, options_for_select(load_categories, selected: f.object.category_id), {}, { id: "category_id", class: "form-control" }
  end

  def select_status f
    f.select :status, options_for_select([["Đang Bán", :buy], ["Ừng Bán", :nobuy]], selected: (f.object.buy? == true ? :buy : :nobuy)), {}, { id: "status", class: "form-control" }
  end
end

