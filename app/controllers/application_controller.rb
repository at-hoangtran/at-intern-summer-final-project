class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include StringFormatsHelper
  include SessionsHelper

  def logged_in_user
    unless logged_in?
      flash[:danger] = 'Vui lòng đăng nhập!'
      redirect_to root_path
    end
  end

  def check_admin
    return if current_user.admin?
    flash[:danger] = 'Bạn không có quyền truy cập!'
    redirect_to root_path
  end

  def correct_user
    @user = User.find_by(id: params[:id])
    redirect_to(root_url) unless @user == current_user
  end

  def size_cart
    @size_cart = Order.find_by(user_id: current_user.id).line_items.size
  end
end
