var auctions = {
  AppOnLoad:function () {
    app_auctions = App.auctions;
  },
  loadElementToHtml: function(data) {
    var html = '';
    var template = $('#data-template').html();
    if (template) {
      $.each(data.obj, function (i, item) {
        html += Mustache.render(template, {
          ID: item.id,
          IMAGE: item.product_image[0].url,
          PRICE: formatPrice(item.product_price),
          TIMER: fmtMSS(item.period)
        });
      });
      $('.load-data').html(html);
      $.each(data.obj, function (i, item) {
        auctions.loading_auction(item.id ,item.period);
      });
    }
  },
  loading_auction: function(id, seconds) {
    if (seconds < 1) {
      $('[load-id="'+ id +'"] .price-time').hide();
      $('[load-id="'+ id +'"] .price-refresh').show();
    } else {
      $('[load-id="'+ id +'"] .price-time').show();
      $('[load-id="'+ id +'"] .price-refresh').hide();
    }
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
  auctions.AppOnLoad();
});
