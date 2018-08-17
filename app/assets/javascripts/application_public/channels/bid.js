App.bid = App.cable.subscriptions.create(
  {
    channel: 'BidChannel',
    timer_id: document.querySelector('head').dataset.timerId,
  },
  {
    received: function(data) {
      var html = '';
      var template = $('#data-template').html();
      if (template) {
        $.each(data.obj, function (i, item) {
          html += Mustache.render(template, {
            NAME: item['name'],
            BID: formatPrice(item['bid']) + ' đ',
            DAYTIME: item['created_at']
          });
        });
        $('.loadbid').html(html);
        $('.user-win').html(data.obj[0]['name']);
      }
    }
  }
);
