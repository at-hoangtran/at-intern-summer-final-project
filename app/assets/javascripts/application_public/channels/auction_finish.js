$(document).on('turbolinks:load', function() {
  head_timer = document.querySelector('.head-timer');
  if (head_timer !== null) {
    App.auction_finish = App.cable.subscriptions.create(
      {
        channel: 'AuctionFinishChannel',
        timer_id: head_timer.dataset.timerId,
      },
      {
        received: function(data) {
          current_id = auction.loadIdCurrentUser();
          if (current_id === data.obj) {
            swal({
              html: '<img src="/assets/surprise-827a3d035ae' +
                    'c0a47ab6e7943cebdf0c1438467b72914841334c1' +
                    '235714e60dc6.png"><br><br>' +
                    'Chúc mừng bạn đã đấu ' +
                    'giá thành công sản phẩm này !<br>'+
                    'Hãy nhập vào phía dưới' +
                    ' để kiểm tra giỏ hàng !' +
                    '<br><a href="#">Giỏ hàng</a><br>' +
                    'Thông báo này sẽ được đóng trong 10 giây' +
                    ', chuyển bạn sang phiên đấu giá mới !',
              timer: 10000
            })
          } else {
            swal({
              html: '<img src="/assets/tear-6f754a657a179' +
                    'fe8b497562db896006fc90812af94443b1210' +
                    '0a2ae86a07789d.png"><br><br>' +
                    'Rất tiếc , bạn không phải ' +
                    'người thắng cuộc trong ' +
                    'phiên đấu giá này !<br> Nhưng ' +
                    'không sao cả, hãy bắt đầu lại nào !<br>' +
                    'Thông báo này sẽ được đóng trong 10 giây' +
                    ', chuyển bạn sang phiên đấu giá mới !',
              timer: 10000
            })
          }
        }
      }
    );
  }
});
