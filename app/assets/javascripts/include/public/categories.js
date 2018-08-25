var categories = {
  loadElementToHtml: function(data) {
    head_category = document.querySelector('.head-category');
    if (head_category !== null) {
      category_id = head_category.dataset.categoryId
      var html = '';
      var template = $('#data-template').html();
      if (template) {
        $.each(data.obj, function (i, item) {
          if (item.product_category == category_id) {
            html += Mustache.render(template, {
              ID: item.id,
              IMAGE: item.product_image[0].url,
              PRICE: formatPrice(item.product_price),
              TIMER: fmtMSS(item.period)
            });
          }
        });
        $('.load-data-category').html(html);
      }
    }
  }
}
