var auction = {
  current_price: 0,
  tmp_price: 0,
  AppOnLoad: function() {

  },
  loadElementToHtml: function(data) {
    data         = data.obj;
    period       = fmtMSS(data['period']);
    price        = formatPrice(data['product_price']);
    images       = data.product_image;
    description  = data['product_description'];
    product_name = data['product_name'];
    step         = data['step'];
    $('.clock-time-show').html(period);
    $('.price-crt').html(price);
    $('.title-product').html(product_name);
    images.forEach(function(item, index) {
      $('.item img:eq('+ index +')').attr('src', item.url);
      $('.carousel-indicators li img:eq('+ index +')').attr('src', item.url);
    });
    $('.description').html(description);
    auction.loadDefaultPriceInput(data['product_price'], step);
  },
  loadDefaultPriceInput: function(price, step) {
    if (price !== auction.current_price) {
      auction.current_price = price;
      auction.tmp_price = price;
      $('#price-input').val(formatPrice(price) + " Đ");
      auction.eventAddBtnPrice(price, step);
      auction.eventSubmitPrice(step);
    }
  },
  eventAddBtnPrice: function(price, step) {
    $('.btn-sub').prop('disabled', true);
    $('.btn-sub').on('click', function() {
      auction.tmp_price -= step;
      $('#price-input').val(formatPrice(auction.tmp_price + " Đ"));
      if (auction.tmp_price === auction.current_price) {
        $('.btn-sub').prop('disabled', true);
      }
    });

    $('.btn-add').on('click', function() {
      auction.tmp_price += step;
      $('#price-input').val(formatPrice(auction.tmp_price + " Đ"));
      if (auction.tmp_price !== auction.current_price) {
        $('.btn-sub').prop('disabled', false);
      }
    });
  },
  eventSubmitPrice: function(step) {
    $('.price-btn-submit').on('click', function() {
      if (auction.tmp_price === auction.current_price) {
        auction.tmp_price += step;
      }
      data = {
        price: auction.tmp_price
      };
      App.auction.send(data)
    });
  },
  conntected: function() {
    swal.close()
  },
  disconnected: function() {
    swal(
      'Đã mất kết nối!',
      'Vui lòng kiểm tra lại!',
      'warning'
    )
  }
}

$(document).on('turbolinks:load', function() {
  auction.AppOnLoad();
});
