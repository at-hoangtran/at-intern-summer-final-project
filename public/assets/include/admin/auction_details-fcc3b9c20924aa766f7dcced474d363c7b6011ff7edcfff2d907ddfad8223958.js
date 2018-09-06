var auction_details = {
  initController: function(){
    auction_details.eventShowDetails();
  },
  tokenForm: function() {
    var token = $('meta[name="csrf-token"]').attr('content');
    return token;
  },
  eventShowDetails: function() {
    $('.show-details').on('click', function (){
      var id = $(this).attr('details-id');
      auction_details.ajaxShowDetails(id);
      auction_details.eventRemove(id);
    });
  },
  ajaxShowDetails: function(id) {
    $.ajax({
      url: '/admin/auctions/' + id,
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      async: false,
      success: function (response) {
        var html = '';
        var template = $('#data-template').html();
        $.each(response, function (i, item) {
          html += Mustache.render(template, {
            ID: item.id,
            NAME: item.user.name,
            BID: auction_details.formatPrice(item.bid) + ' đ',
            STATUS: (item.status) === 'loser' ? true : false,
            STATUS1: (item.status) === 'win' ? true : false
          });
        });
        $('tbody#viewLoad').html(html);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },
  eventRemove: function(id_load) {
    $('.remove-item').on('click', function() {
      var self = $(this);
      var id = self.attr("remove-id");
      auction_details.confirmDelete(id_load, id, self);
    });
  },
  confirmDelete: function (id_load, id, self) {
    swal({
      title: I18n.t("javascripts.include.admin.auction_detail.are-u-sure"),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: I18n.t("javascripts.include.admin.auction_detail.delete"),
      cancelButtonText: I18n.t("javascripts.include.admin.auction_detail.cancel")
    }).then((result) => {
      auction_details.requestAjaxDelete(id_load, id, self);
    });
  },
  requestAjaxDelete: function(id_load, id, self) {
    $.ajax({
      url: '/admin/auction_details/' + id,
      method: 'delete',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', auction_details.tokenForm())},
      async: false,
      success: function(res){
        if (res) {
          self.parents("tr").remove();
        } else {
          auction_details.not_enough_notify();
        }
      },
      statusCode: {
        400: function(){
          auction_details.not_enough_notify();
        }
      }
    });
  },
  not_enough_notify: function() {
    $('.top-right').notify({
      message: { text: I18n.t("javascripts.include.admin.auction_detail.action-failed") }
    }).show();
  },
  formatPrice: function (price){
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
}
$(document).ready(function(){
  auction_details.initController();
});

