App.auctions = App.cable.subscriptions.create('AuctionsChannel', {
  received: function(data) {
    alert('quan');
  }
});
