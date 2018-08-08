var modal_auth = {
  initOnLoad: function() {
    modal_auth.showModalDialog();
    modal_auth.controlButton();
  },

  showModalDialog: function() {
    $('#AuthModal').modal({backdrop: 'static', keyboard: false});
  },

  controlButton: function() {
    $('p.nopassword').on('click', function(){
      $('.nav-tabs a[href="#nopassword"]').tab('show');
    });
  }
}

$(document).ready(function () {
  modal_auth.initOnLoad();
});
