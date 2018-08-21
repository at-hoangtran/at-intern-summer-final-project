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
