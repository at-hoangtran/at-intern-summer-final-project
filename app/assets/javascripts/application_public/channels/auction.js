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
          auction.conntected();
        },
        disconnected: function() {
          auction.disconnected();
        },
        received: function(data) {
          auction.loadElementToHtml(data);
        }
      }
    );
  }
});
