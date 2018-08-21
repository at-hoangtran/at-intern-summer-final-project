class AuctionsController < ApplicationController
  def index; end

  def auction_current
    auctions =
      AuctionDetail
      .joins(:auction)
      .joins(auction: :product)
      .joins(auction: :timer)
      .where('auction_details.user_id = ?', current_user.id)
      .where('auctions.status = ?', 0)
      .select('products.name,
              auction_details.bid,
              auction_details.created_at,
              timers.id')

    respond_to do |format|
      format.json { render json: auctions }
    end
  end

  def auction_win
    auctions =
      AuctionDetail
      .joins(:auction)
      .joins(auction: :product)
      .joins(auction: :timer)
      .where('auction_details.user_id = ?', current_user.id)
      .where('auctions.status = ?', 1)
      .where('auction_details.status = ?', 1)
      .select('products.name,
               auction_details.bid,
               auction_details.created_at,
               timers.id')

    respond_to do |format|
      format.json { render json: auctions }
    end
  end

  def auction_loser
    auctions =
      AuctionDetail
      .joins(:auction)
      .joins(auction: :product)
      .joins(auction: :timer)
      .where('auction_details.user_id = ?', current_user.id)
      .where('auctions.status = ?', 1)
      .where('auction_details.status = ?', 0)
      .select('products.name,
              auction_details.bid,
              auction_details.created_at,
              timers.id,
              auctions.id as au_id')

    auctions = auctions.all
    auctions = auctions.to_a.map(&:serializable_hash)

    auctions = auctions.each do |e|
      auction = Auction.find_by(id: e['au_id'])
      tmp = { "bidmax": auction.auction_details.first.bid }
      e.merge!(tmp)
    end

    respond_to do |format|
      format.json { render json: auctions }
    end
  end
end
