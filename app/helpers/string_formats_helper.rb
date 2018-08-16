module StringFormatsHelper
  def add_price(price)
    price.delete(',')
  end

  def out_price(price)
    price.reverse.scan(/.{1,3}/).join(',').reverse
  end

  def format_day_time(daytime)
    daytime.strftime('%m/%d/%Y')
  end
end
