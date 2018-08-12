var modal_auth = {
  initOnLoad: function() {
    modal_auth.showModalDialog();
    modal_auth.controlButton();
    modal_auth.showResetPassword();
  },

  showModalDialog: function() {
    $('#AuthModal').modal({backdrop: 'static', keyboard: false});
  },

  controlButton: function() {
    $('p.nopassword').on('click', function(){
      $('.nav-tabs a[href="#nopassword"]').tab('show');
    });
  },
  showResetPassword: function() {
    var a = window.location.pathname.indexOf('/password_resets/');
    if (a === 0) {
      $('#AuthModal').modal('hide');
    }
  }
}

$(document).on('turbolinks:load', function() {
  modal_auth.initOnLoad();
});
