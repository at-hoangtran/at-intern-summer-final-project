module ApplicationHelper
  def full_title(page_title)
    page_title
  end

  def size_cart
    return unless logged_in?
    @orders = Order.cart.find_by(user_id: current_user.id)
    @size_cart = @orders.line_items.size if @orders
  end

  def ctr_access
    $redis_counter_access.keys.length
  end

  def user_online
    ids = []
    $redis_onlines.scan_each(match: 'user*') { |u| ids << u.gsub('user:', '') }
    ids.length
  end
end
