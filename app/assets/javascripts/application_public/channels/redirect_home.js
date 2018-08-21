App.redirect_home = App.cable.subscriptions.create(
  {
    channel: 'RedirectHomeChannel',
    timer_id: document.querySelector('head').dataset.timerId,
  },
  {
    received: function(data) {
      if (data.obj === 01) {
        swal(
          'Thông báo!',
          'Xin lỗi sản phẩm đã bán hết hàng!',
          'warning'
        )
      } else {
        swal(
          'Thông báo!',
          'Xin lỗi sản phẩm đã hết thời gian bán!',
          'warning'
        )
      }
      setTimeout(function(){
        window.location="http://localhost:3000/";
      }, 3000)
    }
  }
);
