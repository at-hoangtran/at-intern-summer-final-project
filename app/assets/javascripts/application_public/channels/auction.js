$(document).on('turbolinks:load', function() {
  user_login = conntected_disconnected.load_id_current_user();
  if (user_login) {
    head_timer = document.querySelector('.head-timer');
    if (head_timer !== null) {
      App.auction = App.cable.subscriptions.create(
        {
          channel: 'AuctionChannel',
          timer_id: head_timer.dataset.timerId,
        },
        {
          conntected: function() {
            conntected_disconnected.conntected();
          },
          disconnected: function() {
            conntected_disconnected.disconnected();
          },
          received: function(data) {
            auction.loadElementToHtml(data);
          }
        }
      );
    }
  }
});
