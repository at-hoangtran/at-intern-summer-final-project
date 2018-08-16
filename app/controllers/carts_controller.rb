class CartsController < ApplicationController
  before_action :logged_in_user
  before_action :correct_line_item, only: %i[destroy]
  def index
    return unless Order.find_by(user_id: current_user.id)
    @orders = Order.find_by(user_id: current_user.id)
    @line_items = Order.find_by(user_id: current_user.id).line_items
  end

  def destroy
    if @line_item.destroy
      redirect_to carts_path, flash: { success: 'Xóa sản phẩm thành công!' }
    else
      redirect_to carts_path, flash: { success: 'Xóa sản phẩm thất bại!' }
    end
  end

  private

    def correct_line_item
      @line_item = LineItem.find_by id: params[:id]
    end
end
