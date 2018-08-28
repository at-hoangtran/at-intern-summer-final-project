$(document).on('turbolinks:load', function() {
  App.count_order = App.cable.subscriptions.create(
    {
      channel: 'CountOrderChannel',
      user_id: conntected_disconnected.load_id_current_user(),
    },
    {
      received: function(data) {
        $("#count-order").html(' (' + data.obj + ') ');
      }
    }
  );
});
