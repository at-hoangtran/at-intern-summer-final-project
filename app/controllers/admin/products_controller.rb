class Admin::ProductsController < ApplicationAdminController
  include ProductsHelper
  before_action :get_product, only: %i(edit update destroy destroy_image)
  before_action :get_categorys, only: %i(new create edit update)

  def index
    @products =
    if params[:term].nil?
      Product.paginate(page: params[:page], :per_page => 5)
    else
      Product.search_name(params[:term]).paginate page: params[:page],
      per_page: 5
    end
  end

  def new
    @product = current_user.products.build
  end

  def create
    @product = current_user.products.build product_params
    @product.price = addPrice product_params[:price]
    add_more_images(product_params[:images])
    if @product.save
      respond_to do |format|
        format.html { redirect_to admin_products_url,
          flash: { success: "Thêm sản phẩm thành công !" }}
      end
    else
      respond_to do |format|
        format.html { redirect_to admin_products_url,
          flash: { danger: "Thêm sản phẩm thất bại !" }}
      end
    end
  end

  def edit; end

  def show; end

  def update
    update_more_images(product_params[:images])
    @product_change.price = addPrice product_params[:price]
    if update_product
      respond_to do |format|
        format.html { redirect_to edit_admin_product_url(@product.id),
          flash: { success: "Cập nhật thành công !" }}
      end
    else
      respond_to do |format|
        format.html { redirect_to admin_products_url,
          flash: { danger: "Cập nhật thất bại !"  }}
      end
    end
  end

  def update_product
    product = Product.new.tap do |elemt|
      elemt.status      = product_params[:status]
      elemt.name        = product_params[:name]
      elemt.price       = @product_change.price
      elemt.quantity    = product_params[:quantity]
      elemt.description = product_params[:description]
      elemt.category_id = product_params[:category_id]
      elemt.images      = @product_change.images
    end

    @product.update_attributes(
      status: product.status,
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
        format.html { redirect_to admin_products_url , :flash => { :success => t("admin.products.delete-complete") }}
      end
    else
      respond_to do |format|
        format.html { redirect_to admin_products_url , :flash => { :danger => t("admin.products.delete-error") }}
      end
    end
  end

  def destroy_image
    remove_image_at_index(params[:index].to_i)
    if @product.save
      unless params[:size].to_i == 0
        respond_to do |format|
          format.html { redirect_to edit_admin_product_url(@product.id),
            flash: { success: "Xóa ảnh thành công !" }}
        end
      else
        respond_to do |format|
          format.html { redirect_to edit_admin_product_url(@product.id),
            flash: { :danger => "Bạn không thể xóa tất cả ảnh !" }}
        end
      end
    else
      respond_to do |format|
        format.html { redirect_to edit_admin_product_url(@product.id),
          flash: { danger: "Xóa ảnh thất bại !" }}
      end
    end
  end

  def count_image
    @product = Product.find(params[:id])
    respond_to do |format|
      format.json { render :json =>  @product.images.size}
    end
  end

  private

    def get_categorys
      @categories = Category.by_parent_id_not_match(nil)
    end

    def get_product
      @product = Product.find(params[:id])
      @product_change = @product
      @product || render(file: "public/404.html", status: 404, layout: true)
    end

    def product_params
      params.require(:product).permit(:status, :name, :price, :quantity, :description, :category_id, {images: []})
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
