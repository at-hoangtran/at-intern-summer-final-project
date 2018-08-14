class Admin::AuctionsController < ApplicationAdminController
  include AuctionsHelper
  before_action :load_auction_id, only: %i[destroy]

  def index
    if params[:search].blank?
      @auctions = Auction.includes(:product).includes(:timer)
      @auctions = @auctions.paginate(page: params[:page], per_page: 5)
    else
      @auctions = Auction.includes(:product).includes(:timer)
      search_name
      search_time
      search_status
      @auctions = @auctions.paginate(page: params[:page], per_page: 5)
    end
  end

  def show
    @auction_details = AuctionDetail.by_auction_detail_id params[:id]
    respond_to do |format|
      format.json { render json: @auction_details.as_json(only: %i[id bid status], include: [{ user: { only: %i[name] } }]) }
    end
  end

  def destroy
    if @auction.destroy
      respond_to do |format|
        format.html do
          redirect_to admin_auctions_url,
                      flash: { success: 'Xóa thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_auctions_url,
                      flash: { danger: 'Xóa thất bại !' }
        end
      end
    end
  end

  private

    def load_auction_id
      @auction = Action.find_by id: params[:id]
      @auction || render(file: 'public/404.html', status: 404, layout: true)
    end

    def search_name
      if params[:search][:name].present?
        @auctions = @auctions.joins(:product).search_name params[:search][:name]
      end
    end

    def search_time
      if params[:search][:mintime].present? && params[:search][:maxtime].present?
        mintime = params[:search][:mintime]
        maxtime = params[:search][:maxtime]
        @auctions = @auctions.joins(:timer).search_time mintime, maxtime
      end
    end

    def search_status
      if params[:search][:status].present?
        status = params[:search][:status]
        if status == 'running'
          @auctions = @auctions.search_status 0
        elsif status == 'finished'
          @auctions = @auctions.search_status 1
        end
      end
    end
end
