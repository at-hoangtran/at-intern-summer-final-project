class HistoryOrdersController < ApplicationController
  def index; end

  def request_order
    @orders = Order.where(
      user_id: current_user.id, status: params[:status]
    )
    respond_to do |format|
      format.json do
        render json: @orders.as_json(
          only: %i[id address phone total_price created_at],
          include: [
            { user: { only: %i[name email] } }
          ]
        )
      end
    end
  end
end
