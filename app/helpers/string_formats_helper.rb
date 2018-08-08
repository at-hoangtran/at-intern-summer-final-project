module StringFormatsHelper
  def addPrice price
    price.delete(",")
  end

  def outPrice price
    price.reverse.scan(/.{1,3}/).join(',').reverse
  end

  def formatDayTime daytime
    daytime.strftime("%m/%d/%Y")
  end
end
