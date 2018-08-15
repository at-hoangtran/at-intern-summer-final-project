App.auction = App.cable.subscriptions.create(
  {
    channel: 'AuctionChannel',
    timer_id: document.querySelector('head').dataset.timerId,
  },
  {
    conntected: function() {
      console.log('connected server.');
    },
    disconnected: function() {
      console.log('disconnected server.');
    },
    received: function(data) {
      data   = data.obj;
      period = fmtMSS(data['period']);
      price  = formatPrice(data['product_price']);
      images = data.product_image;
      description = data["product_description"];
      $('.clock-time-show').html(period);
      $('.price-crt').html(price);
      images.forEach(function(item, index) {
        $('.item img:eq('+ index +')').attr('src', item.url);
        $('.carousel-indicators li img:eq('+ index +')').attr('src', item.url);
      });
      $('.description').html(description);
    }
  }
);
