var my_auctions = {
  initOnLoad: function() {
    alert("quan");
  }
}

$(document).on('turbolinks:load', function() {
  my_auctions.initOnLoad();
});
