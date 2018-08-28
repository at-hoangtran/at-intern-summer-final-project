class ApplicationAdminController < ApplicationController
  layout 'admin/application'

  before_action :show_notifys

  def show_notifys
    @notifys = ChatRoomAdmin.where(view: 0, admin: 0)
  end
end
