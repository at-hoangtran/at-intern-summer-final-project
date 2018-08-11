class ExportProduct < ActiveRecord::Base
  def self.export_file(products)
    workbook = RubyXL::Workbook.new

    sheet1 = workbook[0]
    sheet1.sheet_name = 'Product'
    sheet1.add_cell(0, 0, 'ID')
    sheet1.add_cell(0, 1, 'Name')
    sheet1.add_cell(0, 2, 'Quantity')
    sheet1.add_cell(0, 3, 'Price')

    products.each_with_index do |product, num|
      sheet1.add_cell(num + 1, 0, product.id)
      sheet1.add_cell(num + 1, 1, product.name)
      sheet1.add_cell(num + 1, 2, product.quantity)
      sheet1.add_cell(num + 1, 3, product.price)
    end

    last = products.count + 1
    sheet1.add_cell(last, 3, 'Total')
    sheet1.sheet_data[last][3].change_font_bold(true)
    sheet1.add_cell(last + 1, 3, '', "SUM(D2:D#{last})")

    sheet1.change_row_bold(0, true)

    workbook.stream.string
  end
end
