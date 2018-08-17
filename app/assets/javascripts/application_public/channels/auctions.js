App.auctions = App.cable.subscriptions.create('AuctionsChannel', {
  conntected: function() {
    auctions.conntected();
  },
  disconnected: function() {
    auctions.disconnected();
  },
  received: function(data) {
    auctions.loadElementToHtml(data);
  }
});
