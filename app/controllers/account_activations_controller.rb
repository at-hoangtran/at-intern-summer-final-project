class AccountActivationsController < ApplicationController
  def edit
    user = User.find_by(email: params[:email])
    if user && !user.activated? && user.authenticated?(:activation, params[:id])
      user.activate
      log_in user
      flash[:success] = 'Đã kích hoạt tài khoản!'
    else
      flash[:danger] = 'Kích hoạt tài khoản không thành công, vui lòng xem lại!'
    end
    redirect_to root_url
  end
end
