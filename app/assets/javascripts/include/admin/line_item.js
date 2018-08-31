var orders = {
  initController: function(){
    orders.eventShowDetails();
  },
  tokenForm: function() {
    var token = $('meta[name="csrf-token"]').attr('content');
    return token;
  },
  eventShowDetails: function() {
    $('.show-details').on('click', function (){
      var id = $(this).attr('details-id');
      orders.ajaxShowDetails(id);
      orders.eventApprove(id);
      orders.eventReject(id);
    });
  },
  ajaxShowDetails: function(id) {
    $.ajax({
      url: '/admin/orders/' + id,
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      success: function (response) {
        var html = '';
        var template = $('#data-template').html();
        var totalPri = 0;
        var image_default = '/assets/no-product-image-c2f6e0867a2bfea159b171fd3e6d6c1ea49aa8362682254f2a945ad0fcee188c.jpg';
        $.each(response, function (i, item) {
          images = item.product.images.length
          images = images > 0
            ? item.product.images[0].url : image_default;
          html += Mustache.render(template, {
            ID: item.id,
            IMAGE: images,
            NAME: item.product.name,
            PRICE: orders.formatPrice(item.amount) + ' đ',
            STATUS: (item.product.quantity) < 1 ? true : false,
            STATUS1: (item.product.quantity) > 1 ? true : false
          });
          totalPri += item.amount;
        });
        $('tbody#viewLoad').html(html);
        $('strong#totalPri').html(
          I18n.t("javascripts.include.admin.line_item.total_price") + ": "
          + order.formatPrice(totalPri) + ' đ');
        if (response[0].order.status === 'notdefined') {
          $('a#btn-xn, a#btn-h').attr('disabled', false);
        } else {
          $('#btn-xn, #btn-h').attr('disabled', true);
        }
      },
      error: function (err) {
        console.log(err);
      }
    });
  },
  eventReject: function(id) {
    $('#btn-h').on('click', function() {
      $.ajax({
        url: '/admin/orders/'+ id +'/reject',
        method: 'patch',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', orders.tokenForm())},
        data: {
          id: id
        },
        success: function(res){
          if (res) {
            orders.ajaxShowDetails(id);
            orders.reloadPage();
          }
        },
        statusCode: {
          400: function(){
            orders.not_enough_notify();
          }
        }
      });
    });
  },
  eventApprove: function(id) {
    $('#btn-xn').on('click', function() {
      $.ajax({
        url: '/admin/orders/'+ id +'/approve',
        method: 'patch',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', orders.tokenForm())},
        data: {
          id: id
        },
        success: function(res){
          if (res) {
            orders.ajaxShowDetails(id);
            orders.reloadPage();
          }
        },
        statusCode: {
          400: function(){
            orders.not_enough_notify();
          }
        }
      });
    });
  },
  not_enough_notify: function() {
    $('.top-right').notify({
      message: { text: 'Thao tác thất bại !' }
    }).show();
  },
  formatPrice: function(price){
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  },
  reloadPage: function() {
    setTimeout(function(){
      location.reload();
    }, 1000);
  }
}
$(document).ready(function(){
  orders.initController();
});

