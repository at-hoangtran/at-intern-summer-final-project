class PublicPagesController < ApplicationController
  before_action :load_timer, only: %i[show]

  def index; end

  def show
    redirect_to root_url unless @timer.run? || @timer.product.quantity.positive?
    # redirect_to root_url unless check_time(@timer.start_at, @timer.end_at)
    product = @timer.product
    auction = Auction.timer_product(@timer.id, product.id).first
    @bid    = auction.auction_details
  end

  private

    def load_timer
      @timer = Timer.find_by(id: params[:id])
      @timer || render(file: 'public/404.html', status: 404, layout: true)
    end
end
