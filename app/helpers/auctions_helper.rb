module AuctionsHelper
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
end
