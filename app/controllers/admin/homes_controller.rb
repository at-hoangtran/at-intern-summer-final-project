class Admin::HomesController < ApplicationAdminController
  before_action :logged_in_user
  before_action :check_admin
  def index; end
end
