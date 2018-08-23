module ApplicationHelper
  def full_title(page_title)
    base_title = 'Trang'
    if page_title.blank?
      base_title
    else
      base_title + ' : ' + page_title
    end
  end

  def size_cart
    return unless logged_in?
    @orders = Order.cart.find_by(user_id: current_user.id)
    @size_cart = @orders.line_items.size if @orders
  end

  def ctr_access
    $redis_counter_access.keys.length
  end
end
