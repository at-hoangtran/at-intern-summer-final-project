class Admin::UsersController < ApplicationAdminController
  before_action :logged_in_user
  before_action :check_admin
  before_action :load_user_id, only: %i[edit destroy update]

  def index
    if params[:search].blank?
      @users = User.paginate(page: params[:page], per_page: 5)
    else
      @users = User.all
      search_status_active
      search_status_lock
      search_name
      @users = @users.paginate(page: params[:page], per_page: 5)
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
    if @user.deleted?
      if @user.restore
        respond_to do |format|
          format.html do
            redirect_to admin_users_url,
                        flash: { success: 'Mở khóa thành công !' }
          end
        end
      else
        respond_to do |format|
          format.html do
            redirect_to admin_users_url,
                        flash: { success: 'Mở khóa thất bại !' }
          end
        end
      end
    else
      if @user.destroy
        respond_to do |format|
          format.html do
            redirect_to admin_users_url,
                        flash: { success: 'Khóa thành công !' }
          end
        end
      else
        respond_to do |format|
          format.html do
            redirect_to admin_users_url,
                        flash: { danger: 'Khóa thất bại !' }
          end
        end
      end
    end
  end

  def destroy_multiple
    if params[:deleted] == '0'
      if User.restore(params[:users])
        respond_to do |format|
          format.html do
            redirect_to admin_users_url,
                        flash: { success: 'Mở khóa thành công !' }
          end
        end
      else
        respond_to do |format|
          format.html do
            redirect_to admin_users_url,
                        flash: { danger: 'Mở khóa thất bại !' }
          end
        end
      end
    else
      if User.destroy(params[:users])
        respond_to do |format|
          format.html do
            redirect_to admin_users_url,
                        flash: { success: 'Khóa thành công !' }
          end
        end
      else
        respond_to do |format|
          format.html do
            redirect_to admin_users_url,
                        flash: { danger: 'Khóa thất bại !' }
          end
        end
      end
    end
  end

  private

    def load_user_id
      @user = User.with_deleted.find_by(id: params[:id])
      @user || render(file: 'public/404.html', status: 404, layout: true)
    end

    def user_params
      params.require(:user).permit!
    end

    def search_name
      @users = User.search_name params[:search][:name] if params[:search][:name].present?
    end

    def search_status_active
      return unless params[:search][:status_active].present?
      status = params[:search][:status_active]
      @users =
        if status == 'notactive'
          User.where(activated: nil)
        else
          User.where(activated: true)
        end
    end

    def search_status_lock
      return unless params[:search][:status_lock].present?
      status = params[:search][:status_lock]
      @users =
        if status == 'lock'
          User.only_deleted
        else
          User.all
        end
    end
end
