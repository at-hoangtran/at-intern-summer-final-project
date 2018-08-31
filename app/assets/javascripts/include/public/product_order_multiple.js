var product_order_multiple = {
  loadElementToHtml: function(data) {
    var html = '';
    var template = $('#data-template').html();
    if (template) {
      $.each(data.obj, function (i, item) {
        if (product_order_multiple.check_product(item.product_id)) {
          html += Mustache.render(template, {
            ID: item.id,
            IMAGE: item.product_image[0].url,
            PRICE: formatPrice(item.product_price),
            TIMER: fmtMSS(item.period)
          });
        }
      });
      $('.load-data-product-order-multi').html(html);
    }
  },
  check_product: function(value) {
    request = product_order_multiple.request_product();
    for(var i = 0; i < request.length; i++) {
      if (value == request[i]['product_id']) {
        return true;
      }
    }
    return false;
  },
  request_product: function() {
    product_id = null;
    $.ajax({
      url: '/product_muti',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      async: false,
      success: function (response) {
        product_id = response;
      },
      error: function (err) {
        console.log(err);
      }
    });
    return product_id;
  }
}
