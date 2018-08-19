var auction = {
  current_price: 0,
  tmp_price: 0,
  step: 0,
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
    auction.refreshPage(data['period']);
  },
  loadDefaultPriceInput: function(price, step) {
    if (price !== auction.current_price) {
      auction.current_price = price;
      auction.tmp_price = price;
      $('#price-input').val(formatPrice(price) + " Đ");
      auction.eventAddBtnPrice(price, step);
      auction.step = step;
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
  eventSubmitPrice: function() {
    $('.price-btn-submit').on('click', function() {
      if (auction.tmp_price === auction.current_price) {
        auction.tmp_price += auction.step;
      }
      data = {
        price: auction.tmp_price,
        user_id: auction.loadIdCurrentUser()
      };
      App.auction.send(data)
    });
  },
  refreshPage: function(period) {
    if (period == 0) {
      $('.loadbid').children().remove();
      $('.user-win').html("");
    }
  },
  loadIdCurrentUser: function () {
    user_id = null;
    $.ajax({
      url: '/current_user',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      async: false,
      success: function (response) {
        user_id = response;
      },
      error: function (err) {
        console.log(err);
      }
    });
    return user_id;
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
  auction.eventSubmitPrice();
});
