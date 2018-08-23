class Admin::HomesController < ApplicationAdminController
  before_action :logged_in_user
  before_action :check_admin
  def index
    @orders = Order.all.size
    @products = Product.all.size
    @users = User.all.size
    @auctions = Auction.all.size
  end

  def chart_order
    chart    = []
    wday     = DateTime.now.wday
    crt_wday = wday
    daytime = DateTime.now

    if wday == 1
      chart << Order.where(created_at: daytime).size
    else
      while wday >= 1
        chart << Order.not_cart.where('DATE(created_at) = ?', daytime).size
        wday -= 1
        daytime -= 1
      end
    end

    respond_to do |format|
      format.json { render json: chart }
    end
  end
end
