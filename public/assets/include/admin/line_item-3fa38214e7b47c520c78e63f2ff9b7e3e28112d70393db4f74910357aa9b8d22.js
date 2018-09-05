var line_item = {
  initController: function(){
    line_item.eventShowDetails();
  },
  tokenForm: function() {
    var token = $('meta[name="csrf-token"]').attr('content');
    return token;
  },
  eventShowDetails: function() {
    $('.show-details').on('click', function (){
      var id = $(this).attr('details-id');
      line_item.ajaxShowDetails(id);
      line_item.eventApprove(id);
      line_item.eventReject(id);
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
        var image_default = '/assets/no-product-image-0f35e2b34a82f17cac95766bab3727091fc29403eeb8c3241290ba8a086b600d.png';
        $.each(response, function (i, item) {
          images = item.product.images.length
          images = images > 0
            ? item.product.images[0].url : image_default;
          html += Mustache.render(template, {
            ID: item.id,
            IMAGE: images,
            NAME: item.product.name,
            PRICE: line_item.formatPrice(item.amount) + ' đ',
            STATUS: (item.product.quantity) < 1 ? true : false,
            STATUS1: (item.product.quantity) > 1 ? true : false
          });
          totalPri += item.amount;
        });
        $('tbody#viewLoad').html(html);
        $('strong#totalPri').html(
          I18n.t("javascripts.include.admin.line_item.total_price") + ": "
          + line_item.formatPrice(totalPri) + ' đ');
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
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', line_item.tokenForm())},
        data: {
          id: id
        },
        success: function(res){
          if (res) {
            line_item.ajaxShowDetails(id);
            line_item.reloadPage();
          }
        },
        statusCode: {
          400: function(){
            line_item.not_enough_notify();
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
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', line_item.tokenForm())},
        data: {
          id: id
        },
        success: function(res){
          if (res) {
            line_item.ajaxShowDetails(id);
            line_item.reloadPage();
          }
        },
        statusCode: {
          400: function(){
            line_item.not_enough_notify();
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
  line_item.initController();
});
