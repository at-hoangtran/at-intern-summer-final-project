var search_index = {
  status: false,
  value: null,
  loadElementToHtml: function(data) {
    var html = '';
    var template = $('#data-template').html();
    var image_default = '/assets/no-product-image-0f35e2b34a82f17cac95766bab3727091fc29403eeb8c3241290ba8a086b600d.png';
    if (template) {
      $.each(data.obj, function (i, item) {
        images = item.product_image.length
        images = images > 0 ? item.product_image[0].url : image_default;
        if (search_index.check_product(item.product_id, search_index.value))
        {
          html += Mustache.render(template, {
            ID: item.id,
            IMAGE: images,
            PRICE: formatPrice(item.product_price),
            TIMER: fmtMSS(item.period)
          });
        }
      });
      $('.load-data-search').html(html);
    }
  },
  submit_search: function() {
    $('input.input-search').keypress(function(e){
      if (e.which == 13) {
        value = $('input.input-search').val();
        if (value !== "") {
          search_index.status = true;
          search_index.value  = value;
        } else {
          search_index.status = false;
        }
      }
    });
  },
  check_product: function(value, input) {
    request = search_index.request_product(input);
    for(var i = 0; i < request.length; i++) {
      if (value == request[i]) {
        return true;
      }
    }
    return false;
  },
  request_product: function(search) {
    product_id = null;
    $.ajax({
      url: '/search_index/' + search,
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

$(document).ready(function() {
  search_index.submit_search();
});
