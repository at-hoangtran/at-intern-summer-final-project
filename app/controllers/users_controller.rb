class UsersController < ApplicationController
  before_action :find_user, only: %i[show edit update destroy]
  before_action :check_email, only: %i[create]
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    if @email
      flash[:danger] = 'Email is exist!'
      redirect_to root_path
    else
      @user = User.create(user_params)
      if @user
        @user.send_activation_email
        flash[:info] = 'Please check your email to activate your account.'
        redirect_to root_path
      else
        render :new
      end
    end
  end

  private

    def find_user
      @user = User.find_by(id: params[:id])
    end

    def check_email
      @email = User.find_by(email: params[:user][:email])
    end

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
