function openNav() {
  document.getElementById("mySidenav").style.width = "55%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function updateUserForm() {
  $(".edit-user").on('click', function() {
    $('#frmEitProfile input[type="text"]').prop("disabled", false);
    // $('.edit-user').style.displax`y = "none";
    $('.edit-user').hide();
    $('.edit-left').show();
  });
}
$(document).on('turbolinks:load', function() {
  $(".dropdown").hover(function() {
    $('.dropdown-menu', this).stop(true, true).fadeIn("fast");
    $(this).toggleClass('open');
    $('b', this).toggleClass("caret caret-up");
  }, function() {
    $('.dropdown-menu', this).stop(true, true).fadeOut("fast");
    $(this).toggleClass('open');
    $('b', this).toggleClass("caret caret-up");
  });

  
});

$(document).on('turbolinks:load', function() {
  updateUserForm();
});
