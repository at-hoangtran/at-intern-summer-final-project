document.addEventListener("turbolinks:load", function() {
    jQuery('#camera_wrap_1').camera({
        height: '300',
        loader: 'bar',
        alignment: 'center',
        time: 3000,
        pagination: true,
        thumbnails: false
    });
    jQuery('#camera_wrap_2').camera({
        height: '250',
        loader: 'bar',
        pagination: true,
        thumbnails: false
    });
});

function openNav() {
    document.getElementById("mySidenav").style.width = "55%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function() {
        $('#back-to-top').tooltip('hide');
        $('body, html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
    $('#back-to-top').tooltip('show');
});

$(document).ready(function() {
    setInterval(function(){
        $(".error_msg").delay(3000).slideUp();
    }, 500);
});
