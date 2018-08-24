class RedirectHomeChannel < ApplicationCable::Channel
  def subscribed
    stream_from "redirect_home_#{params[:timer_id]}"
  end
end
