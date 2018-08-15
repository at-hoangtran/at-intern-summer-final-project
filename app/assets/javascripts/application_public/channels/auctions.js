App.auctions = App.cable.subscriptions.create('AuctionsChannel', {
  conntected: function() {
    console.log('connected server.');
  },
  disconnected: function() {
    console.log('disconnected server.');
  },
  received: function(data) {
    var html = '';
    var template = $('#data-template').html();
    if (template) {
      $.each(data.obj, function (i, item) {
        html += Mustache.render(template, {
          ID: item.id,
          IMAGE: item.product_image[0].url,
          PRICE: formatPrice(item.product_price),
          TIMER: fmtMSS(item.period)
        });
        loading_auction(item.period);
      });
      $('.load-data').html(html);
    }
  }
});

function loading_auction(seconds) {
  if (seconds < 1) {
    $('.price-time').hide();
    $('.price-refresh').show();
  } else {
    $('.price-time').show();
    $('.price-refresh').hide();
  }
}
