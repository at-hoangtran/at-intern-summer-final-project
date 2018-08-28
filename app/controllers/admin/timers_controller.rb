require 'timers/timer_data'

class Admin::TimersController < ApplicationAdminController
  include TimersHelper
  before_action :logged_in_user
  before_action :check_admin
  before_action :get_products, only: %i[new edit]
  before_action :load_timer_id, only: %i[edit update destroy]

  def index
    if params[:search].blank?
      @timers = Timer.includes(:product).paginate(page: params[:page], per_page: 5)
    else
      @timers = Timer.includes(:product).all
      search_day
      search_status
      @timers = @timers.paginate(page: params[:page], per_page: 5)
    end
  end

  def new
    @timer = Timer.new
  end

  def create
    @timer = Timer.new timer_params
    str_time = @timer.period.strftime('%H:%M').split(':')
    @timer.period = "00:#{str_time[0]}:#{str_time[1]}"
    @timer.step = add_price timer_params[:step]
    if @timer.save
      TimerData.add(@timer)
      respond_to do |format|
        format.html do
          redirect_to admin_timers_url,
                      flash: { success: 'Tạo mới thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_timers_url,
                      flash: { danger: 'Tạo mới thất bại !' }
        end
      end
    end
  end

  def show; end

  def edit
    @timer = @timer.tap do |elmt|
      elmt.start_at = format_time(@timer.start_at)
      elmt.end_at = format_time(@timer.end_at)
      elmt.period = format_time_sounds(@timer.period)
    end
  end

  def update
    if update_timer
      respond_to do |format|
        format.html do
          redirect_to edit_admin_timer_url(@timer.id),
                      flash: { success: 'Cập nhật thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_timers_url,
                      flash: { danger: 'Cập nhật thất bại !' }
        end
      end
    end
  end

  def update_timer
    timer_tmp = Timer.new.tap do |elemt|
      elemt.product_id = timer_params[:product_id]
      elemt.start_at   = timer_params[:start_at]
      elemt.end_at     = timer_params[:end_at]
      elemt.period     = timer_params[:period]
      elemt.step       = add_price timer_params[:step]
      elemt.status     = timer_params[:status]
    end

    str_time = timer_tmp.period.strftime('%H:%M').split(':')
    timer_tmp.period = "00:#{str_time[0]}:#{str_time[1]}"

    TimerData.update(timer_tmp, @timer)

    @timer.update_attributes(
      product_id: timer_tmp.product_id,
      start_at: timer_tmp.start_at,
      end_at: timer_tmp.end_at,
      period: timer_tmp.period,
      step: timer_tmp.step,
      status: timer_tmp.status
    )
  end

  def destroy
    obj_user = @timer
    if @timer.destroy
      TimerData.delete(obj_user)
      respond_to do |format|
        format.html do
          redirect_to admin_timers_url,
                      flash: { success: 'Xóa thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_timers_url,
                      flash: { danger: 'Xóa thất bại !' }
        end
      end
    end
  end

  def destroy_multiple
    if Timer.destroy(params[:timers])
      respond_to do |format|
        format.html do
          redirect_to admin_timers_url,
                      flash: { success: 'Xóa thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_timers_url,
                      flash: { danger: 'Xóa thất bại !' }
        end
      end
    end
  end

  def destroy_cache
    TimerData.delete_all
    respond_to do |format|
      format.html do
        redirect_to admin_timers_url,
                    flash: { success: 'Xóa cache thành công !' }
      end
    end
  end

  private

    def get_products
      @products = Product.all
    end

    def load_timer_id
      @timer = Timer.find_by id: params[:id]
      @timer || render(file: 'public/404.html', status: 404, layout: true)
    end

    def search_day
      if params[:search][:mintime].present? && params[:search][:maxtime].present?
        mintime = params[:search][:mintime]
        maxtime = params[:search][:maxtime]
        @timers = @timers.search_time mintime, maxtime
      end
    end

    def search_status
      return unless params[:search][:status].present?
      status = params[:search][:status]
      @timers = if status == 'waiting'
                  @timers.search_status 0
                else
                  @timers.search_status 1
                end
    end

    def timer_params
      params.require(:timer).permit :product_id, :start_at, :end_at, :period, :step, :status
    end
end
