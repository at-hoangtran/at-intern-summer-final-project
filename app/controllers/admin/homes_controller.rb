class Admin::HomesController < ApplicationAdminController
  before_action :logged_in_user
  before_action :check_admin
  def index
    @orders = Order.not_cart.all.size
    @products = Product.all.size
    @users = User.all.size
    @auctions = Auction.all.size
  end

  def chart_order
    chart    = []
    wday     = DateTime.now.wday
    daytime  = DateTime.now

    wday = 7 if wday.zero?

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
    daytime = DateTime.now
    order   = Order.not_cart.where('DATE(created_at) = ?', daytime).size
    respond_to do |format|
      format.json { render json: order }
    end
  end

  def request_auction
    daytime = DateTime.now
    auction = Auction.search_status(1).where('DATE(created_at) = ?', daytime).size
    respond_to do |format|
      format.json { render json: auction }
    end
  end

  def request_member
    daytime = DateTime.now
    member  = User.where('DATE(created_at) = ?', daytime).size
    respond_to do |format|
      format.json { render json: member }
    end
  end

  def request_online
    ids = []
    $redis_onlines.scan_each(match: 'user*') { |u| ids << u.gsub('user:', '') }

    respond_to do |format|
      format.json { render json: ids.length }
    end
  end
end
