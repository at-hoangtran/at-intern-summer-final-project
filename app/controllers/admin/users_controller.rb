class Admin::UsersController < ApplicationAdminController
  before_action :logged_in_user
  before_action :check_admin
  before_action :load_user_id, only: %i[edit destroy update]

  def index
    @users =
      if params[:term].nil?
        User.paginate(page: params[:page], per_page: 5)
      else
        User.search_name(params[:term]).paginate(page: params[:page], per_page: 5)
      end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    @user.activated = true
    @user.activated_at = Time.zone.now
    if @user.save
      if params[:user][:avatar].present?
        render :crop
      else
        respond_to do |format|
          format.html do
            redirect_to admin_users_url,
                        flash: { success: 'Tạo mới thành công !' }
          end
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_users_url,
                      flash: { danger: 'Tạo mới thất bại !' }
        end
      end
    end
  end

  def edit; end

  def show; end

  def update
    if @user.update_attributes user_params
      if params[:user][:avatar].present?
        render :crop
      else
        respond_to do |format|
          format.html do
            redirect_to admin_users_url,
                        flash: { success: 'Cập nhật thành công !' }
          end
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_users_url,
                      flash: { danger: 'Cập nhật thất bại !' }
        end
      end
    end
  end

  def destroy
    if @user.destroy
      respond_to do |format|
        format.html do
          redirect_to admin_users_url,
                      flash: { success: 'Xóa thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_users_url,
                      flash: { danger: 'Xóa thất bại !' }
        end
      end
    end
  end

  def destroy_multiple
    if User.destroy(params[:users])
      respond_to do |format|
        format.html do
          redirect_to admin_users_url,
                      flash: { success: 'Xóa thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_users_url,
                      flash: { danger: 'Xóa thất bại !' }
        end
      end
    end
  end

  private

    def load_user_id
      @user = User.find_by id: params[:id]
      @user || render(file: 'public/404.html', status: 404, layout: true)
    end

    def user_params
      params.require(:user).permit!
    end
end
