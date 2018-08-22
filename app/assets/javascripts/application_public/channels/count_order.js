$(document).on('turbolinks:load', function() {
  App.count_order = App.cable.subscriptions.create(
    {
      channel: 'CountOrderChannel',
      user_id: 1,
    },
    {
      received: function(data) {
        $("#count-order").html('(' + data.obj + ')');
      }
    }
  );
});
