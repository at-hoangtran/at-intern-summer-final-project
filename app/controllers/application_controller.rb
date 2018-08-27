class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_locale
  include StringFormatsHelper
  include SessionsHelper

  before_action :menu_categories

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

  def default_url_options
    { locale: I18n.locale }
  end

  def menu_categories
    @categories = Category.all.by_parent_id_status
  end

  private

    def set_locale
      I18n.locale = params[:locale] || I18n.default_locale
    end
end
