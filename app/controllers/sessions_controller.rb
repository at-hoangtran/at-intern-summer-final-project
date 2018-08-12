class SessionsController < ApplicationController
  def new; end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user&.authenticate(params[:session][:password])
      if user.activated?
        log_in user
        params[:session][:remember_me] == Settings.remember_me ? remember(user) : forget(user)
      else
        message  = 'Account not activated. '
        message += 'Check your email for the activation link.'
        flash[:warning] = message
      end
    else
      flash[:danger] = 'Invalid email/password combination'
    end
    redirect_to root_path
  end

  def login_google
    @user = User.find_or_create_from_auth_hash(request.env['omniauth.auth'])
    log_in @user
    session[:user_id] = @user.id
    redirect_to root_path
  end

  def destroy
    log_out if logged_in?
    redirect_to root_path
  end
end
