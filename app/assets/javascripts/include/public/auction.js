var auction = {
  current_price: 0,
  tmp_price: 0,
  step: 0,
  loadElementToHtml: function(data) {
    data          = data.obj;
    period        = fmtMSS(data['period']);
    price         = formatPrice(data['product_price']);
    images        = data.product_image;
    description   = data['product_description'];
    product_name  = data['product_name'];
    step          = data['step'];
    category_name = data['category_name'];
    $('.clock-time-show').html(period);
    $('.price-crt').html(price);
    $('.title-category').html(category_name);
    $('.title-product').html(product_name);
    car_inner = $('.carousel-inner').html();
    car_indicators = $('.carousel-indicators').html();
    if (car_inner == '' && car_indicators == '') {
      if (images.length > 0) {
        images.forEach(function(item, index) {
          active = index == 0 ? 'active' : ''
          html_inner = '<div class="item '+ active +'">';
          html_inner += '<img src="'+ item.url +'">';
          html_inner += '</div>';
          $('.carousel-inner').append(html_inner);
          html_indi = '<li class="'+ active +'" data-slide-to="'+ index +'" data-target="#article-photo-carousel">';
          html_indi += '<img src="'+ item.url +'">';
          html_indi += '</li>';
          $('.carousel-indicators').append(html_indi);
        });
      } else {
        var image_default = '/assets/no-product-image-0f35e2b34a82f17cac95766bab3727091fc29403eeb8c3241290ba8a086b600d.png';
        html_inner = '<div class="item active">';
        html_inner += '<img src="'+ image_default +'">';
        html_inner += '</div>';
        $('.carousel-inner').append(html_inner);
      }
    }
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
        user_id: conntected_disconnected.load_id_current_user()
      };
      App.auction.send(data)
    });
  },
  refresh_page: function(period) {
    if (period == 0) {
      $('.loadbid').children().remove();
      $('.user-win').html("");
    }
  }
}

$(document).ready(function() {
  auction.event_submit_price();
});
