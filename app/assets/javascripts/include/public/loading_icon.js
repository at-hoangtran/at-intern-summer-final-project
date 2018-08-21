var loading_icon = {
  loadIcon: function(data) {
    $.each(data.obj, function (i, item) {
      loading_icon.loading_auction(item.id ,item.period);
    });
  },
  loading_auction: function(id, seconds) {
    if (seconds < 1) {
      $('[load-id="'+ id +'"] .price-time').hide();
      $('[load-id="'+ id +'"] .price-refresh').show();
    } else {
      $('[load-id="'+ id +'"] .price-time').show();
      $('[load-id="'+ id +'"] .price-refresh').hide();
    }
  },
  conntected: function() {
    swal.close()
  },
  disconnected: function() {
    swal(
      'Đã mất kết nối!',
      'Vui lòng kiểm tra lại!',
      'warning'
    )
  }
}
