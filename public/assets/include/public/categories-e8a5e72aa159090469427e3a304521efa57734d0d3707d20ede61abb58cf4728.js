var categories = {
  loadElementToHtml: function(data) {
    head_category = document.querySelector('.head-category');
    if (head_category !== null) {
      category_id = head_category.dataset.categoryId
      var html = '';
      var template = $('#data-template').html();
      var image_default = '/assets/no-product-image-0f35e2b34a82f17cac95766bab3727091fc29403eeb8c3241290ba8a086b600d.png';
      if (template) {
        $.each(data.obj, function (i, item) {
          images = item.product_image.length
          images = images > 0 ? item.product_image[0].url : image_default;
          if (item.product_category == category_id) {
            html += Mustache.render(template, {
              ID: item.id,
              IMAGE: images,
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
;
