var auctions = {
  AppOnLoad:function () {
    app_auctions = App.auctions;
  },
  loadElementToHtml: function(data) {
    var html = '';
    var template = $('#data-template').html();
    var image_default = '/assets/no-product-image-c2f6e0867a2bfea159b171fd3e6d6c1ea49aa8362682254f2a945ad0fcee188c.jpg';
    if (template) {
      $.each(data.obj, function (i, item) {
        images = item.product_image.length
        images = images > 0 ? item.product_image[0].url : image_default;
        html += Mustache.render(template, {
          ID: item.id,
          IMAGE: images,
          PRICE: formatPrice(item.product_price),
          TIMER: fmtMSS(item.period)
        });
      });
      $('.load-data').html(html);
    }
  }
}

$(document).on('turbolinks:load', function() {
  auctions.AppOnLoad();
});
