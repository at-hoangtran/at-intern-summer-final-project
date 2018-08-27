var category = {
  initController: function (){
    category.showDetails();
  },
  showDetails: function () {
    $('.show-details').on('click', function (){
      var self = $(this);
      var id = self.attr("details-id");
      $.ajax({
        url: '/admin/categories/' + id,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'JSON',
        async: false,
        success: function (response) {
          var html = '';
          var template = $('#data-template').html();
          $.each(response, function (i, item) {
            images = item.images.length
            images = images > 0 ? item.images[0].url : null;
            html += Mustache.render(template, {
              ID: item.id,
              IMAGE: images,
              NAME: item.name,
              QUANTITY: item.quantity + ' cái',
              PRICE: category.formatPrice(item.price) + ' đ',
              CATEGORY: item.category.name,
              STATUS: (item.quantity) < 1 ? true : false,
              STATUS1: (item.quantity) >= 1 ? true : false
            });
          });
          $("tbody#viewLoad").html(html);
        },
        error: function (err) {
          console.log(err);
        }
      });
    });
  },
  formatPrice: function (price){
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
}
$(document).ready(function(){
  category.initController();
});
