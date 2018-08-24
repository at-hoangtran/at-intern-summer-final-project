$(document).on('turbolinks:load', function() {
  App.count_order = App.cable.subscriptions.create(
    {
      channel: 'CountOrderChannel',
      user_id: auction.load_id_current_user(),
    },
    {
      received: function(data) {
        $("#count-order").html(' (' + data.obj + ') ');
      }
    }
  );
});
