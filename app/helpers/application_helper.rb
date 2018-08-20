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
    if Order.find_by(user_id: current_user.id)
      @size_cart = Order.find_by(user_id: current_user.id).line_items.size
    end
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
