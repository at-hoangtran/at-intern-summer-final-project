$(document).ready(function() {
  !function ($) {
    $(document).on("click","ul.nav li.parent > a > span.icon", function(){
        $(this).find('em:first').toggleClass("glyphicon-minus");
    });
    $(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");
  }(window.jQuery);

  $(window).on('resize', function () {
    if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
  });

  $(window).on('resize', function () {
    if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
  });

  $(".img-add").hide();
  $("#avatar").change(function () {
    $(".img-add").show();
    if (this.files && this.files[0]) {
     var reader = new FileReader();
      reader.onload = function (e) {
        $(".img").attr("width", "150");
        $(".img").attr("height", "150");
        $(".img").attr("src", e.target.result);
      }
      reader.readAsDataURL(this.files[0]);
    }
  });

  $("#rvimg").hide();
  $("#upload-image").on("change", function(){
    $('#preview').html("");
    var preview = document.querySelector('#preview');
    var files   = document.querySelector('input[type=file]').files;
    $("#rvimg").show();
    function readAndPreview(file) {
      if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
          var image = new Image();
          image.height = 180;
          image.width = 180;
          image.title = file.name;
          image.className = "img-thumbnail";
          image.style.margin = "5px";
          image.src = this.result;
          preview.appendChild( image );
        }, false);
        reader.readAsDataURL(file);
      }
    }
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  });

  $('.datetimepicker').datetimepicker({
    format: 'HH:mm'
  });

  $('.datetimepicker-sounds').datetimepicker({
    format: 'mm:ss'
  });

  if ($('textarea').length > 0) {
    var data = $('.ckeditor');
    $.each(data, function(i) {
      CKEDITOR.replace(data[i].id)
    });
  }

  $("#select_all").change(function(){
    checked = $(this).prop("checked");
    $(".checkbox").prop('checked', checked);

    if(checked) {
      $('.delete-all-show').show();
    } else {
      $('.delete-all-show').hide();
    }
  });

  $('.checkbox').change(function(){
    if(false == $(this).prop("checked")){
      $("#select_all").prop('checked', false);
    }

    if($('.checkbox:checked').length == $('.checkbox').length ){
      $("#select_all").prop('checked', true);
    }

    if ($('.checkbox:checked').length == 0){
      $('.delete-all-show').hide();
    } else {
      $('.delete-all-show').show();
    }
  });
});


