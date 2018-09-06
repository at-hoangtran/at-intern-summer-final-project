var product = {
  initController: function (){
    product.showDetails();
  },
  showDetails: function () {
    $('.show-details').on('click', function (){
      var self = $(this);
      var id = self.attr("details-id");
      $.ajax({
        url: '/admin/products/' + id,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'JSON',
        async: false,
        success: function (response) {
          var html_order = '';
          var template_order = $('#data-template-order').html();
          $.each(response, function (i, item) {
            html_order += Mustache.render(template_order, {
              ID: item.id,
              NAME: item.user_name,
              ADDRESS: item.address,
              PHONE: item.phone,
              EMAIL: item.user.email,
              DATETIME: product.formatDateTime(item.created_at),
              PRICE: product.formatPrice(item.total_price) + ' đ'
            });
          });
          $("tbody#viewLoadOrder").html(html_order);
          $('#btn-remove-product').attr('href', '/admin/products/' + id);
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
  product.initController();
});
