class SessionsController < ApplicationController
  def new; end

  def create
    user = User.find_by(email: params[:session][:email].downcase)

    if user&.authenticate(params[:session][:password])
      log_in user
      params[:session][:remember_me] == Settings.remember_me ? remember(user) : forget(user)
    else
      flash.now[:danger] = 'Invalid email/password combination'
    end
    redirect_to root_path
  end

  def destroy
    log_out if logged_in?
    redirect_to root_path
  end
end
