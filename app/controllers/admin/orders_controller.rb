class Admin::OrdersController < ApplicationAdminController
  include OrdersHelper
  before_action :logged_in_user
  before_action :check_admin
  before_action :load_order_id, only: %i[approve reject]

  def index
    if params[:search].blank?
      @orders = Order.not_cart.paginate(page: params[:page], per_page: 5)
    else
      @orders = Order.all
      search_name
      search_price
      search_day
      search_status
      @orders = @orders.not_cart.paginate(page: params[:page], per_page: 5)
    end
  end

  def show
    @line_item = LineItem.by_order_id params[:id]
    respond_to do |format|
      format.json { render json: @line_item.as_json(only: %i[id amount], include: [{ product: { only: %i[id images name quantity] } }, { order: { only: %i[id status] } }]) }
    end
  end

  def approve
    @order.update_attribute :status, :defined
    render json: true
  end

  def reject
    @line_item = @order.line_items.all
    @line_item.each do |key|
      product = Product.find_by id: key.product_id
      product.update_attribute(:quantity, product.quantity + 1)
    end
    @order.update_attribute :status, :cancel
    render json: true
  end

  private

    def load_order_id
      @order = Order.find_by id: params[:id]
      @order || render(file: 'public/404.html', status: 404, layout: true)
    end

    def search_name
      if params[:search][:name].present?
        @orders = Order.joins(:user).search_name params[:search][:name]
      end
    end

    def search_price
      if params[:search][:min].present? && params[:search][:max].present?
        min = addPrice params[:search][:min]
        max = addPrice params[:search][:max]
        @orders = @orders.search_price min, max
      end
    end

    def search_day
      if params[:search][:minday].present? && params[:search][:maxday].present?
        minday = params[:search][:minday]
        maxday = params[:search][:maxday]
        @orders = @orders.search_day minday, maxday
      end
    end

    def search_status
      if params[:search][:status].present?
        status = params[:search][:status]
        if status == 'notdefined'
          @orders = @orders.search_status 1
        elsif status == 'defined'
          @orders = @orders.search_status 2
        elsif status == 'cancel'
          @orders = @orders.search_status 3
        end
      end
    end
end
