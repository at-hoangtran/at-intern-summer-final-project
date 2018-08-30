class ExportOrder < ActiveRecord::Base
  def self.export_file(order)
    workbook = RubyXL::Workbook.new

    sheet1 = workbook[0]
    sheet1.sheet_name = 'Order'
    sheet1.add_cell(0, 0, 'Tên khách hàng')
    sheet1.add_cell(0, 1, 'Địa chỉ')
    sheet1.add_cell(0, 2, 'Điện thoại')
    sheet1.add_cell(0, 3, 'Email')
    sheet1.add_cell(0, 4, 'Ngày đặt')
    sheet1.add_cell(0, 5, 'Thành tiền')

    sheet1.add_cell(1, 0, order.user.name)
    sheet1.add_cell(1, 1, order.address)
    sheet1.add_cell(1, 2, order.phone)
    sheet1.add_cell(1, 3, order.user.email)
    sheet1.add_cell(1, 4, order.created_at.to_s)
    sheet1.add_cell(1, 5, ExportOrder.out_price(order.total_price.to_s))

    sheet1.change_column_width(0, order.user.name.length + 2)
    sheet1.change_column_width(1, order.address.length + 2)
    sheet1.change_column_width(2, order.phone.length + 2)
    sheet1.change_column_width(3, order.user.email.length + 2)
    sheet1.change_column_width(4, order.created_at.to_s.length + 2)
    sheet1.change_column_width(5, ExportOrder.out_price(order.total_price.to_s).length + 2)

    sheet1.add_cell(3, 0, 'Danh sách sản phẩm :')

    sheet1.add_cell(5, 0, 'Tên sản phẩm')
    sheet1.add_cell(5, 1, 'Thành tiền')

    order.line_items.each_with_index do |line_item, num|
      sheet1.add_cell(num + 6, 0, line_item.product.name)
      sheet1.add_cell(num + 6, 1, ExportOrder.out_price(line_item.amount.to_s))
      sheet1.change_column_width(0, line_item.product.name.length)
      sheet1.change_column_width(1, line_item.amount.to_s.length + 2)
    end

    sheet1.change_row_bold(0, true)
    sheet1.change_row_bold(3, true)
    sheet1.change_row_bold(5, true)

    workbook.stream.string
  end

  def self.out_price(price)
    price.reverse.scan(/.{1,3}/).join(',').reverse
  end
end
