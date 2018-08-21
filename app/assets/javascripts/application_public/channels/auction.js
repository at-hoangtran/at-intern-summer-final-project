$(document).on('turbolinks:load', function() {
  head_timer = document.querySelector('.head-timer');
  if (head_timer !== null) {
    App.auction = App.cable.subscriptions.create(
      {
        channel: 'AuctionChannel',
        timer_id: head_timer.dataset.timerId,
      },
      {
        conntected: function() {
          loading_icon.conntected();
        },
        disconnected: function() {
          loading_icon.disconnected();
        },
        received: function(data) {
          auction.loadElementToHtml(data);
        }
      }
    );
  }
});
