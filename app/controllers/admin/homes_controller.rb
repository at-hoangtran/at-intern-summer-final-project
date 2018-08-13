class Admin::HomesController < ApplicationAdminController
  before_action :logged_in_user
  before_action :check_admin
  def index
    @orders = Order.all.size
    @products = Product.all.size
    @users = User.all.size
    @auctions = Auction.all.size
  end
end
