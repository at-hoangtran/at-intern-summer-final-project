module OrdersHelper
  def set_mindate
    if params[:search].present?
      params[:search][:minday] if params[:search][:minday].present?
    end
  end
 
  def set_maxdate
    if params[:search].present?
      params[:search][:maxday] if params[:search][:maxday].present?
    end
  end
 
  def set_minprice
    if params[:search].present?
      params[:search][:min] if params[:search][:min].present?
    end
  end
 
  def set_maxprice
    if params[:search].present?
      params[:search][:max] if params[:search][:max].present?
    end
  end
 
  def set_status
    if params[:search].present?
      params[:search][:status] if params[:search][:status].present?
    end
  end
 
  def set_name
    if params[:search].present?
      params[:search][:name] if params[:search][:name].present?
    end
  end
end
