class PublicPagesController < ApplicationController
  include TimersHelper
  before_action :load_timer, only: %i[show]

  def index
    @search = true
  end

  def show
    redirect_to root_url unless @timer.run? || @timer.product.quantity.positive?
    redirect_to root_url unless check_time(@timer.start_at, @timer.end_at)
    product = @timer.product
    auction = Auction.timer_product(@timer.id, product.id).first
    @bid    = auction.auction_details
  end

  def product_order_multiple
    product_muti = ActiveRecord::Base.connection.execute(
      "select product_id from line_items
      where DATE(created_at) = '#{DateTime.now}'
      group by product_id HAVING COUNT(product_id) > 5"
    )
    respond_to do |format|
      format.json { render json: product_muti }
    end
  end

  def search_index
    products = Product.search_name(params[:search]).pluck(:id)
    respond_to do |format|
      format.json { render json: products }
    end
  end

  private

    def load_timer
      @timer = Timer.find_by(id: params[:id])
      @timer || render(file: 'public/404.html', status: 404, layout: true)
    end
end
