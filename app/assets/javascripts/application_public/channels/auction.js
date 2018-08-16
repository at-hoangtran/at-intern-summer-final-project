App.auction = App.cable.subscriptions.create(
  {
    channel: 'AuctionChannel',
    timer_id: document.querySelector('head').dataset.timerId,
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

