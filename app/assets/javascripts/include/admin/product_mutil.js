var product_mutil = {
  initController: function (){
    product_mutil.showDetails();
  },
  showDetails: function () {
    $('.delete-all-show').on('click', function (){
      var ids = [];
      $('.checkbox:checked').each(function(){
        ids.push($(this).val());
      });

      $.ajax({
        url: '/admin/product/multiple/' + ids,
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
              DATETIME: product_mutil.formatDateTime(item.created_at),
              PRICE: product_mutil.formatPrice(item.total_price) + ' đ'
            });
          });
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
  product_mutil.initController();
});
