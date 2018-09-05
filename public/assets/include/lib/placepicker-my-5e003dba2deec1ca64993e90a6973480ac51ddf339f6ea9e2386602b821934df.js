$(document).ready(function() {
  $("#advanced-placepicker").each(function() {
    var target = this;
    var $collapse = $(this).parents('.control-group').next('.collapse');
    var $map = $collapse.find('.another-map-class');

    var placepicker = $(this).placepicker({
      map: $map.get(0),
      placeChanged: function(place) {
        console.log("place changed: ", place.formatted_address, this.getLocation());
      }
    }).data('placepicker');
  });
});
