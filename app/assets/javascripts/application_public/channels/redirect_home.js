$(document).on('turbolinks:load', function() {
  head_timer = document.querySelector('.head-timer');
  if (head_timer !== null) {
    App.redirect_home = App.cable.subscriptions.create(
      {
        channel: 'RedirectHomeChannel',
        timer_id: head_timer.dataset.timerId,
      },
      {
        received: function(data) {
          if (data.obj === 1) {
            swal(
              'Thông báo!',
              'Xin lỗi sản phẩm đã bán hết hàng!',
              'warning'
            )
          } else if (data.obj === 2) {
            swal(
              'Thông báo!',
              'Xin lỗi sản phẩm đã hết thời gian bán!',
              'warning'
            )
          } else {
            swal(
              'Thông báo!',
              'Xin lỗi sản phẩm đã ngừng bán!',
              'warning'
            )
          }
          setTimeout(function(){
            window.location="http://localhost:3000/";
          }, 3000)
        }
      }
    );
  }
});
