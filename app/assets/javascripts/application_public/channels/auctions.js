App.auctions = App.cable.subscriptions.create('AuctionsChannel', {
  conntected: function() {
    auctions.conntected();
  },
  disconnected: function() {
    auctions.disconnected();
  },
  received: function(data) {
    categories.loadElementToHtml(data);
    auction_seconds_end.loadElementToHtml(data);
    auctions.loadElementToHtml(data);
  }
});
