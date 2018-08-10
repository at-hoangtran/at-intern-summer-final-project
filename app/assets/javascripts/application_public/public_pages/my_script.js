function openNav() {
  document.getElementById("mySidenav").style.width = "55%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
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
