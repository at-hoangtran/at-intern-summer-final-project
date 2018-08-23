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

  def request_order
    arr = []
    daytime = DateTime.now
    arr << Order.not_cart.where('DATE(created_at) = ?', daytime).size
    arr << Order.not_cart.where('DATE(created_at) = ?', (daytime - 1)).size

    arr << if arr[0] > arr[1]
             ((2 - 1) * 100)
           else
             0
           end

    respond_to do |format|
      format.json { render json: arr }
    end
  end

  def request_auction
    arr = []
    daytime = DateTime.now
    arr << Auction.search_status(1).where('DATE(created_at) = ?', daytime).size
    arr << Auction.search_status(1).where('DATE(created_at) = ?', (daytime - 1)).size

    arr << if arr[0] > arr[1]
             ((2 - 1) * 100)
           else
             0
           end

    respond_to do |format|
      format.json { render json: arr }
    end
  end

  def request_member
    arr = []
    daytime = DateTime.now
    arr << User.where('DATE(created_at) = ?', daytime).size
    arr << User.where('DATE(created_at) = ?', (daytime - 1)).size

    arr << if arr[0] > arr[1]
             ((2 - 1) * 100)
           else
             0
           end

    respond_to do |format|
      format.json { render json: arr }
    end
  end
end
