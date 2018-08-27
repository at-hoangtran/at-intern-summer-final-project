var conntected_disconnected = {
  conntected: function() {
    console.log('conntected.');
  },
  disconnected: function() {
    swal(
      I18n.t("javascripts.include.public.auction.disconnected"),
      I18n.t("javascripts.include.public.auction.please-check-again"),
      I18n.t("javascripts.include.public.auction.warning")
    )
  },
  load_id_current_user: function () {
    user_id = null;
    $.ajax({
      url: '/current_user',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'JSON',
      async: false,
      success: function (response) {
        user_id = response;
      },
      error: function (err) {
        console.log(err);
      }
    });
    return user_id;
  }
}
