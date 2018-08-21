App.auctions = App.cable.subscriptions.create('AuctionsChannel', {
  conntected: function() {
    loading_icon.conntected();
  },
  disconnected: function() {
    loading_icon.disconnected();
  },
  received: function(data) {
    if (search_index.status) {
      search_index.loadElementToHtml(data);
      $('.not-search').hide();
      $('.search').show();
    } else {
      categories.loadElementToHtml(data);
      auction_seconds_end.loadElementToHtml(data);
      product_order_multiple.loadElementToHtml(data);
      auctions.loadElementToHtml(data);
      $('.not-search').show();
      $('.search').hide();
    }
    loading_icon.loadIcon(data);
  }
});
