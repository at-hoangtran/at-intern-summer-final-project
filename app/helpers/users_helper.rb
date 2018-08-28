module UsersHelper
  def admin?
    current_user.role == 'admin'
  end

  def set_name
    if params[:search].present?
      params[:search][:name] if params[:search][:name].present?
    end
  end

  def set_status_active
    if params[:search].present?
      params[:search][:status_active] if params[:search][:status_active].present?
    end
  end

  def set_status_lock
    if params[:search].present?
      params[:search][:status_lock] if params[:search][:status_lock].present?
    end
  end
end
