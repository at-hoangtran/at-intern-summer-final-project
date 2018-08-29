var auction_seconds_end = {
  loadElementToHtml: function(data) {
    var html = '';
    var template = $('#data-template').html();
    if (template) {
      $.each(data.obj, function (i, item) {
        if (item.period < 15) {
          html += Mustache.render(template, {
            ID: item.id,
            IMAGE: item.product_image[0].url,
            PRICE: formatPrice(item.product_price),
            TIMER: fmtMSS(item.period)
          });
        }
      });
      $('.load-data-seconds-end').html(html);
    }
  }
}
