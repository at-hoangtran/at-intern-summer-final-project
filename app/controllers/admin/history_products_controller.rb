class Admin::HistoryProductsController < ApplicationAdminController
  before_action :logged_in_user
  before_action :check_admin
  before_action :get_product, only: %i[destroy]

  def index
    @history_products =
      if params[:term].nil?
        Product.only_deleted.paginate(page: params[:page], per_page: 5)
      else
        Product.only_deleted.search_name(params[:term]).paginate(page: params[:page], per_page: 5)
      end
  end

  def destroy
    if @product.restore
      respond_to do |format|
        format.html do
          redirect_to admin_history_products_url,
                      flash: { success: 'Khôi phục thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_history_products_url,
                      flash: { danger: 'Khôi phục thất bại !' }
        end
      end
    end
  end

  def restore_multiple
    if Product.restore(params[:products])
      respond_to do |format|
        format.html do
          redirect_to admin_history_products_url,
                      flash: { success: 'Khôi phục thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_history_products_url,
                      flash: { danger: 'Khôi phục thất bại !' }
        end
      end
    end
  end

  private

    def get_product
      @product = Product.only_deleted.find_by(id: params[:id])
      @product || render(file: 'public/404.html', status: 404, layout: true)
    end
end
