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
      flash[:danger] = 'Email đã tồn tại'
      redirect_to root_path
    else
      @user = User.create!(user_params)
      if @user
        @user.send_activation_email
        flash[:info] = 'Vui lòng xác nhận email.'
        redirect_to root_path
      else
        render :new
      end
    end
  end

  def edit; end

  def update
    if @user.update_attributes(user_params)
      flash.now[:success] = 'Cập nhật thông tin thành công'
    else
      flash.now[:danger] = 'Cập nhật thông tin thất bại'
    end
    render 'edit'
  end

  private

    def find_user
      @user = User.find_by(id: params[:id])
    end

    def check_email
      @email = User.find_by(email: params[:user][:email])
    end

    def user_params
      params.require(:user).permit(
        :name,
        :email,
        :password,
        :password_confirmation,
        :address,
        :phone
      )
    end
end
