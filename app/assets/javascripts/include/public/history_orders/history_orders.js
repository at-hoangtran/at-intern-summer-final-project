var history_orders = {
  id_order: null,
  initOnLoad: function() {
    history_orders.event_tab_notdefined();
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href");
      if (target === '#order_notdefined') {
        history_orders.event_tab_notdefined();
      }

      if (target === '#order_defined') {
        history_orders.event_tab_defined();
      }

      if (target === '#order_cancel') {
        history_orders.event_tab_cancel();
      }
    });
    history_orders.show_modal();
    history_orders.export_file();
  },
  event_tab_notdefined: function() {
    var html = '';
    var template = $('#data-notdefined-order').html();
    data = history_orders.request_order(1);
    if (template) {
      $.each(data, function (i, item) {
        html += Mustache.render(template, {
          ID: item.id,
          KNAME: item.user.name,
          PHONENUMBER: item.phone,
          ADDRESS: item.address,
          EMAIL: item.user.email,
          PRICE: formatPrice(item.total_price.toString()) + " đ",
          DATETIME: history_orders.formatDateTime(item.created_at)
        });
      });
    }
    $('.load-notdefined-order').html(html);
  },
  event_tab_defined: function() {
    var html = '';
    var template = $('#data-defined-order').html();
    data = history_orders.request_order(2);
    if (template) {
      $.each(data, function (i, item) {
        html += Mustache.render(template, {
          ID: item.id,
          KNAME: item.user.name,
          PHONENUMBER: item.phone,
          ADDRESS: item.address,
          EMAIL: item.user.email,
          PRICE: formatPrice(item.total_price.toString()) + " đ",
          DATETIME: history_orders.formatDateTime(item.created_at)
        });
      });
    }
    $('.load-defined-order').html(html);
  },
  event_tab_cancel: function() {
    var html = '';
    var template = $('#data-cancel-order').html();
    data = history_orders.request_order(3);
    if (template) {
      $.each(data, function (i, item) {
        html += Mustache.render(template, {
          ID: item.id,
          KNAME: item.user.name,
          PHONENUMBER: item.phone,
          ADDRESS: item.address,
          EMAIL: item.user.email,
          PRICE: formatPrice(item.total_price.toString()) + " đ",
          DATETIME: history_orders.formatDateTime(item.created_at)
        });
      });
    }
    $('.load-cancel-order').html(html);
  },
  request_order: function(status) {
    data = null;
    $.ajax({
      url: '/request_history_order/' + status,
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      async: false,
      success: function (response) {
        data = response;
      },
      error: function (err) {
        console.log(err);
      }
    });
    return data;
  },
  show_modal: function() {
    $(document).on('click','tr.show_modal',function(){
      var id = $(this).attr('data-order-id');
      $("#detailsModal").modal();
      history_orders.ajaxShowDetails(id);
      history_orders.id_order = id;
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
        var template = $('#data-template-modal-line-item').html();
        var totalPri = 0;
        var image_default = '/assets/no-product-image-0f35e2b34a82f17cac95766bab3727091fc29403eeb8c3241290ba8a086b600d.png';
        $.each(response, function (i, item) {
          images = item.product.images.length
          images = images > 0
            ? item.product.images[0].url : image_default;
          html += Mustache.render(template, {
            IMAGE: images,
            NAME: item.product.name,
            PRICE: formatPrice(item.amount) + ' đ'
          });
          totalPri += item.amount;
        });
        $('tbody#viewLoadLineItem').html(html);
        $('strong#totalPri').html('Tổng tiền: ' + formatPrice(totalPri) + ' đ');
      },
      error: function (err) {
        console.log(err);
      }
    });
  },
  export_file: function(id) {
    $("#btn-export").on('click', function() {
      id = history_orders.id_order;
      window.location = '/history_orders/' + id + '/export_file.xlsx';
    });
  },
  formatDateTime: function(datetime) {
    var date = new Date(datetime);
    dateTime = moment(date).format("DD-MM-YYYY HH:mm:ss");
    return dateTime;
  }
}

$(document).ready(function() {
  history_orders.initOnLoad();
});
