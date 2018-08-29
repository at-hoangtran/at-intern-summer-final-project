class Admin::CategoriesController < ApplicationAdminController
  include CategoriesHelper
  before_action :logged_in_user
  before_action :check_admin
  before_action :load_category, except: %i[index new create]
  before_action :load_categories, only: %i[new create]
  before_action :load_categories_by_not_match_id, only: %i[edit update show]

  def index
    @categories =
      if params[:term].nil?
        Category.by_parent_id_status.paginate(page: params[:page], per_page: 5)
      else
        Category.by_parent_id_status.search_name(params[:term]).paginate(
          page: params[:page],
          per_page: 5
        )
      end
  end

  def new
    @category = Category.new
  end

  def show
    subcategories   = Category.find_by(id: params[:id]).branch_ids
    product_details = Product.all.by_category_id subcategories
    line_item       = LineItem.where(product_id: product_details.pluck(:id))
    order_id        = line_item.pluck(:order_id).uniq
    orders          = Order.where(id: order_id).where(status: 1)

    products = product_details.as_json(
      only: %i[id images name quantity price],
      include: [{ category: { only: %i[id name] } }]
    )

    orders = orders.as_json(
      only: %i[id user_name address phone total_price status created_at],
      include: [{ user: { only: %i[id email] } }]
    )

    respond_to do |format|
      format.json { render json: { products: products, orders: orders } }
    end
  end

  def create
    @category = Category.new category_params
    if @category.save
      respond_to do |format|
        format.html do
          redirect_to admin_categories_url,
                      flash: { success: 'Tạo danh mục thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_categories_url,
                      flash: { danger: 'Tạo danh mục thất bại !' }
        end
      end
    end
  end

  def edit; end

  def update
    if @category.update category_params
      respond_to do |format|
        format.html do
          redirect_to admin_categories_url,
                      flash: { success: 'Cập nhật thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_categories_url,
                      flash: { danger: 'Cập nhật thất bại !' }
        end
      end
    end
  end

  def destroy
    if @category.destroy
      respond_to do |format|
        format.html do
          redirect_to admin_categories_url,
                      flash: { success: 'Xóa thành công !' }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_categories_url,
                      flash: { danger: 'Xóa thất bại !' }
        end
      end
    end
  end

  private

    def category_params
      params.require(:category).permit :name, :parent_id
    end

    def load_categories
      @categories = Category.all
    end

    def load_categories_by_not_match_id
      @categories = @category.load_cat_parent
    end

    def load_category
      @category = Category.find_by id: params[:id]
      @category || render(file: 'public/404.html', status: 404, layout: true)
    end
end
