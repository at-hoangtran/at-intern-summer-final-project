module StringFormatsHelper
  def add_price(price)
    price.delete(',')
  end

  def out_price(price)
    price.reverse.scan(/.{1,3}/).join(',').reverse
  end

  def format_day(day)
    day.strftime('%m/%d/%Y')
  end

  def format_day_time(daytime)
    daytime.strftime('%d/%m/%Y - %H:%M:%S')
  end
end
