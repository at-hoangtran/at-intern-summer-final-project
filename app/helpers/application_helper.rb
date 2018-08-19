module ApplicationHelper
  def full_title(page_title)
    base_title = 'Web'
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

  def set_interval(delay)
    mutex = Mutex.new
    Thread.new do
      mutex.synchronize do
        loop do
          sleep delay
          yield
        end
      end
    end
  end
end
