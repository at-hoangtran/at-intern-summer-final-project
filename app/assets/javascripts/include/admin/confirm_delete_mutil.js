var confirm_delete_mutil = {
  initController: function () {
    confirm_delete_mutil.event_delete_mutil();
  },
  event_delete_mutil: function() {
    $('.confirm_delete').on('click',function(e){
      e.preventDefault();
      var form = $(this).parents('form');
      swal({
        title: 'Bạn đã chắc chắn?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        form.submit();
      });
    });
  }
}

$(document).ready(function(){
  confirm_delete_mutil.initController();
});
