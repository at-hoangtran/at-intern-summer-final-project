var auctions = {
  AppOnLoad:function () {
    app_auctions = App.auctions;
  },
  loadElementToHtml: function(data) {
    var html = '';
    var template = $('#data-template').html();
    var image_default = '/assets/no-product-image-0f35e2b34a82f17cac95766bab3727091fc29403eeb8c3241290ba8a086b600d.png';
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

$(document).ready(function() {
  auctions.AppOnLoad();
});
