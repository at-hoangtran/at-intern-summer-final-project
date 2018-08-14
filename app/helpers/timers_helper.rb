module TimersHelper
  def set_mintime
    if params[:search].present?
      params[:search][:mintime] if params[:search][:mintime].present?
    end
  end

  def set_maxtime
    if params[:search].present?
      params[:search][:maxtime] if params[:search][:maxtime].present?
    end
  end

  def set_status
    if params[:search].present?
      params[:search][:status] if params[:search][:status].present?
    end
  end

  def select_products(obj)
    obj.select :product_id,
               options_for_select(load_products, selected: obj.object.product_id),
               {},
               id: 'product_id',
               class: 'form-control'
  end

  def select_status(obj)
    obj.select :status,
               options_for_select([['Chưa bán', :waiting], ['Đang bán', :run]],
                                  selected: (obj.object.waiting? == true ? :waiting : :run)),
               {},
               id: 'status',
               class: 'form-control'
  end

  def format_time(time)
    time.strftime('%H:%M')
  end

  def format_time_sounds(time)
    time.strftime('%M:%S')
  end

  def print_period(time)
    time.strftime('%M').to_i.positive?
  end
end
