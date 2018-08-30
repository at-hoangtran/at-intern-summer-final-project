$(document).on('turbolinks:load', function() {
  head_timer = document.querySelector('.head-timer');
  if (head_timer !== null) {
    App.message_bid = App.cable.subscriptions.create(
      {
        channel: 'MessageBidChannel',
        timer_id: head_timer.dataset.timerId,
      },
      {
        received: function(data) {
          price = formatPrice(data.obj)
          swal({
            title: 'Thông báo!',
            type: 'info',
            text: 'Bạn đang giữ giá ' + price + ' đ là giá cao nhất !',
            timer: 2000
          })
        }
      }
    );
  }
});
