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
          var html_order = '';
          var template   = $('#data-template').html();
          var template_order = $('#data-template-order').html();
          $.each(response.products, function (i, item) {
            images = item.images.length
            images = images > 0 ? item.images[0].url : null;
            html += Mustache.render(template, {
              ID: item.id,
              IMAGE: images,
              NAME: item.name,
              QUANTITY: item.quantity + ' cái',
              PRICE: category.formatPrice(item.price) + ' đ',
              CATEGORY: item.category.name,
              STATUS: (item.quantity < 1),
              STATUS1: (item.quantity >= 1)
            });
          });

          $.each(response.orders, function (i, item) {
            html_order += Mustache.render(template_order, {
              ID: item.id,
              NAME: item.user_name,
              ADDRESS: item.address,
              PHONE: item.phone,
              EMAIL: item.user.email,
              DATETIME: category.formatDateTime(item.created_at),
              PRICE: category.formatPrice(item.total_price) + ' đ'
            });
          });
          $("tbody#viewLoad").html(html);
          $("tbody#viewLoadOrder").html(html_order);
        },
        error: function (err) {
          console.log(err);
        }
      });
    });
  },
  formatPrice: function (price){
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  },
  formatDateTime: function(datetime) {
    var date = new Date(datetime);
    dateTime = moment(date).format("DD/MM/YYYY");
    return dateTime;
  }
}
$(document).ready(function(){
  category.initController();
});
