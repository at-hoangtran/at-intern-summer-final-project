class OrdersController < ApplicationController
  before_action :correct_order, only: %i(edit update)
  def edit; end

  def update; end

  private
    def order_params
      params.require(:oder).permit(:user_name, :phone, :address)
    end

    def correct_order
      @order = Order.find_by(user_id: current_user.id)
    end
    
end
