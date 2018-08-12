class Admin::AuctionDetailsController < ApplicationAdminController
  include AuctionsHelper
  before_action :logged_in_user
  before_action :check_admin
  before_action :load_auction_details_id, only: %i[destroy]

  def destroy
    if @auction_details.destroy
      render json: true
    else
      render json: false
    end
  end

  private

    def load_auction_details_id
      @auction_details = AuctionDetail.find_by id: params[:id]
      @auction_details || render(file: 'public/404.html', status: 404, layout: true)
    end
end
