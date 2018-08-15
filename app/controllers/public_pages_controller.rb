class PublicPagesController < ApplicationController
  def index; end

  def show
    set_interval(1) do |n|
      key_timer = JSON.load($redis.get(params[:id]))
      ActionCable.server.broadcast("auction_#{params[:id]}", obj: key_timer)
    end
  end
end
