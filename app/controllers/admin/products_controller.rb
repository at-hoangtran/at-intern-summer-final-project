class Admin::ProductsController < ApplicationAdminController
  include ProductsHelper
  before_action :logged_in_user
  before_action :check_admin
  before_action :get_product, only: %i[edit update destroy destroy_image]
  before_action :get_categorys, only: %i[new create edit update]

  def index
    @products =
      if params[:term].nil?
        Product.paginate(page: params[:page], per_page: 5)
      else
        Product.search_name(params[:term]).paginate(page: params[:page], per_page: 5)
      end
  end

  def new
    @product = current_user.products.build
  end

  def create
    @product = current_user.products.build product_params
    @product.price = add_price product_params[:price]
    add_more_images(product_params[:images])
    if @product.save
      respond_to do |format|
        format.html do
          redirect_to admin_products_url,
                      flash: { success: t('.create-success') }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_products_url,
                      flash: { danger: t('.create-error') }
        end
      end
    end
  end

  def edit; end

  def show; end

  def update
    update_more_images(product_params[:images])
    @product_change.price = add_price product_params[:price]
    if update_product
      respond_to do |format|
        format.html do
          redirect_to edit_admin_product_url(@product.id),
                      flash: { success: t('.update-success') }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_products_url,
                      flash: { danger: t('.update-error') }
        end
      end
    end
  end

  def update_product
    product = Product.new.tap do |elemt|
      elemt.name        = product_params[:name]
      elemt.price       = @product_change.price
      elemt.quantity    = product_params[:quantity]
      elemt.description = product_params[:description]
      elemt.category_id = product_params[:category_id]
      elemt.images      = @product_change.images
    end

    @product.update_attributes(
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      category_id: product.category_id,
      images: product.images
    )
  end

  def destroy
    if @product.destroy
      respond_to do |format|
        format.html do
          redirect_to admin_products_url,
                      flash: { success: t('delete-success') }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_products_url,
                      flash: { danger: t('.delete-error') }
        end
      end
    end
  end

  def destroy_image
    remove_image_at_index(params[:index].to_i)
    if @product.save
      if params[:size].to_i.zero?
        respond_to do |format|
          format.html do
            redirect_to edit_admin_product_url(@product.id),
                        flash: { danger: t('.delete-error-all') }
          end
        end
      else
        respond_to do |format|
          format.html do
            redirect_to edit_admin_product_url(@product.id),
                        flash: { success: t('.delete-success') }
          end
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to edit_admin_product_url(@product.id),
                      flash: { danger: t('.delete-error') }
        end
      end
    end
  end

  def count_image
    @product = Product.find_by(id: params[:id])
    respond_to do |format|
      format.json { render json: @product.images.size }
    end
  end

  def import
    render :import
  end

  def import_file
    Product.import(params[:file])
    respond_to do |format|
      format.html do
        redirect_to admin_products_url,
                    flash: { success: t('.import-success') }
      end
    end
  end

  def export_file
    @products = Product.all

    respond_to do |format|
      format.xlsx do
        send_data ExportProduct.export_file @products
      end
    end
  end

  private

    def load_products
      @products = Product.all
    end

    def get_categorys
      @categories = Category.by_parent_id_not_match(nil)
    end

    def get_product
      @product = Product.find_by(id: params[:id])
      @product_change = @product
      @product || render(file: 'public/404.html', status: 404, layout: true)
    end

    def product_params
      params.require(:product).permit(
        :name,
        :price,
        :quantity,
        :description,
        :category_id,
        images: []
      )
    end

    def add_more_images(new_images)
      images = @product.images
      @product.assign_attributes(images: images)
    end

    def update_more_images(new_images)
      images = @product_change.images
      images += new_images if new_images.present?
      @product_change.assign_attributes(images: images)
    end

    def remove_image_at_index(index)
      remain_images = @product.images
      remain_images.delete_at(index)
      @product.assign_attributes images: remain_images
    end
end
