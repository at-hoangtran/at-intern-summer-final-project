require 'timers/timer_data'

class OrdersController < ApplicationController
  before_action :logged_in_user
  before_action :correct_order, only: %i[edit update]
  before_action :correct_line_item, only: %i[destroy]
  before_action :total_price, only: %i[index edit update]

  def index; end

  def edit; end

  def update
    if update_status
      redirect_to root_path, flash: { success: 'Đặt hàng thành công!' }
    else
      render 'edit', flash: { danger: 'Vui lòng xem lại thông tin!' }
    end
  end

  def update_status
    @order.update_attributes(order_params)
    @order.update_attributes(status: 1, total_price: @total_price)
  end

  def destroy
    if @line_item.destroy
      product = @line_item.product
      product.update_attribute(:quantity, product.quantity + 1)
      TimerData.add_quantity(product.id)
      redirect_to orders_path, flash: { success: 'Xóa sản phẩm thành công!' }
    else
      redirect_to orders_path, flash: { success: 'Xóa sản phẩm thất bại!' }
    end
  end

  private

    def order_params
      params.require(:order).permit(:user_name, :phone, :address)
    end

    def correct_order
      @order = Order.find_by(user_id: current_user.id)
    end

    def correct_line_item
      @line_item = LineItem.find_by id: params[:id]
    end

    def total_price
      @total_price = 0
      @orders = Order.cart.find_by(user_id: current_user.id)
      if @orders
        @line_items = @orders.line_items
        @line_items.each { |item| @total_price += item.amount }
      end
    end
end
