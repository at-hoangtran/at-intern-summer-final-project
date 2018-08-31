$(document).on('turbolinks:load', function() {
  head_timer = document.querySelector('.head-timer');
  App.loser_bid = App.cable.subscriptions.create(
    {
      channel: 'LoserBidChannel',
      user_id: conntected_disconnected.load_id_current_user(),
    },
    {
      received: function(data) {
        data = data.obj;
        price = data.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        if (head_timer !== null) {
          timer_id = head_timer.dataset.timerId;
          if (timer_id != data.id) {
            $.notify(
              {
                title: '<a href="/public_pages/'+ data.id +'" data-turbolinks="false">Phiên đấu giá - ' + data.pro_n + "</a>",
                content: data.name + ' đã đặt cược giá mới là ' + price + ' đ',
                timeout:15000
              }
            );
          }
        } else {
          $.notify(
            {
              title: '<a href="/public_pages/'+ data.id +'" data-turbolinks="false">Phiên đấu giá - ' + data.pro_n + "</a>",
              content: data.name + ' đã đặt cược giá mới là ' + price + ' đ',
              timeout:15000
            }
          );
        }
      }
    }
  );
});
