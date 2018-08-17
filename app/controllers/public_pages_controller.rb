class PublicPagesController < ApplicationController
  def index; end

  def show
    timer   = Timer.find_by(id: params[:id])
    product = timer.product
    auction = Auction.timer_product(timer.id, product.id).first
    @bid    = auction.auction_details
  end
end
