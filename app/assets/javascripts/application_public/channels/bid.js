$(document).on('turbolinks:load', function() {
  head_timer = document.querySelector('.head-timer');
  if (head_timer !== null) {
    App.bid = App.cable.subscriptions.create(
      {
        channel: 'BidChannel',
        timer_id: head_timer.dataset.timerId,
      },
      {
        received: function(data) {
          var html = '';
          var template = $('#data-template-details').html();
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
  }
});
