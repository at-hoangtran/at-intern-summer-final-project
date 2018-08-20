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
    $('.description').html(description);
    $('.btn-price-timer').attr("load-id", data['id']);
    auction.load_default_price_input(data['product_price'], step);
    auction.refresh_page(data['period']);
  },
  load_default_price_input: function(price, step) {
    if (price !== auction.current_price) {
      auction.current_price = price;
      auction.tmp_price = price;
      $('#price-input').val(formatPrice(price) + " Đ");
      auction.event_add_btn_price(price, step);
      auction.step = step;
    }
  },
  event_add_btn_price: function(price, step) {
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
  event_submit_price: function() {
    $('.price-btn-submit').on('click', function() {
      if (auction.tmp_price === auction.current_price) {
        auction.tmp_price += auction.step;
      }
      data = {
        price: auction.tmp_price,
        user_id: auction.load_id_current_user()
      };
      App.auction.send(data)
    });
  },
  refresh_page: function(period) {
    if (period == 0) {
      $('.loadbid').children().remove();
      $('.user-win').html("");
    }
  },
  load_id_current_user: function () {
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
  auction.event_submit_price();
});
