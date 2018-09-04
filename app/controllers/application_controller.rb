class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_locale
  include StringFormatsHelper
  include SessionsHelper

  before_action :set_online
  before_action :menu_categories
  before_action :counter_access

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

  def set_online
    if !!current_user
      $redis_onlines.set( "user:#{current_user.id}", nil, ex: 10 * 60 )
    else
      $redis_onlines.set( "ip:#{request.remote_ip}", nil, ex: 10 * 60 )
    end
  end

  def all_signed_in_in_touch
    ids = []
    $redis_onlines.scan_each(match: 'user*') { |u| ids << u.gsub('user:', '') }
    ids
  end

  def all_anonymous_in_touch
    $redis_onlines.scan_each(match: 'ip*').to_a.size
  end

  def all_who_are_in_touch
    $redis_onlines.dbsize
  end

  def counter_access
    counter = $redis_counter_access.keys
    today   = Date.today
    ip      = request.remote_ip

    $redis_counter_access.set(today, ip) if counter.length.zero?

    counter.each do |e|
      ip_redis = $redis_counter_access.get(e)
      if ip == ip_redis
        $redis_counter_access.set(today, request.remote_ip) unless today == e.to_date
      else
        $redis_counter_access.set(today, request.remote_ip)
      end
    end
  end

  private

    def set_locale
      I18n.locale = params[:locale] || I18n.default_locale
    end
end
