!function(e,t){function n(n,o){function a(){return'<div class="input-group"><span class="input-group-btn"><button type="button" data-toggle="collapse" href="#'+o.mapContainerId+'" class="btn btn-default"><span class="'+o.mapIconClass+'"></span></button></span></div>'}function i(){if(o.mapContainerId){var t=e(n),i=t.parent(),l=i.children().index(n);t.replaceWith(a()),i.children().eq(l).append(n)}}function l(e){if(e){var t={query:e};b&&b.textSearch(t,function(e,t){if(t===google.maps.places.PlacesServiceStatus.OK)for(var n=0;n<e.length;n++)return void f(e[n])})}}function s(e){C.geocode({latLng:e},function(e,t){t===google.maps.GeocoderStatus.OK&&(e[0]&&f(e[0],!1))})}function c(){return(m=e(o.map).get(0))||o.mapContainerId&&(m=e("#"+o.mapContainerId+" .placepicker-map").get(0)),!!m}function r(){c()&&(h=new google.maps.Map(m,o.mapOptions),y.bindTo("bounds",h),google.maps.event.addListener(h,"click",function(e){var t=e.latLng;L.setPosition(t),h.panTo(t),n.blur(),s(t)}),L=new google.maps.Marker({map:h}),b=new google.maps.places.PlacesService(h),e(m).parent().on("show.bs.collapse",function(t){e(t.target).css("display","block").find("img[src*='gstatic.com/'], img[src*='googleapis.com/']").css("max-width","none"),n.value?w.resize():w.geoLocation(),e(t.target).css("display","")}))}function u(){y=new google.maps.places.Autocomplete(n,o.autoCompleteOptions),google.maps.event.addListener(y,"place_changed",function(){var e=y.getPlace();e.geometry&&f(e)})}function p(){w.resize.call(w)}function g(){function t(t,a){if("keydown"===t){var i=a;a=function(t){var o=e(".pac-item-selected").length>0;if((13===t.which||13===t.keyCode)&&!o){var a=e.Event("keydown",{keyCode:40,which:40});i.apply(n,[a])}i.apply(n,[t])}}o.apply(n,[t,a])}var o=n.addEventListener?n.addEventListener:n.attachEvent;n.addEventListener=t,n.attachEvent=t}function d(){if(C=new google.maps.Geocoder,g(),i(),u(),r(),n.value)l(n.value);else{var a=o.latitude||e(o.latitudeInput).prop("value"),s=o.longitude||e(o.longitudeInput).prop("value");a&&s&&w.setLocation(a,s)}e(t).on("resize",p),e(n).on("keypress",function(e){o.preventSubmit&&13===e.keyCode&&(e.preventDefault(),e.stopImmediatePropagation())})}function f(t,a){a=void 0===a,I=t,w.resize();var i=t.geometry.location;a&&v(i),e(o.latitudeInput).prop("value",i.lat()),e(o.longitudeInput).prop("value",i.lng()),a||(n.value=t.formatted_address),"function"==typeof o.placeChanged&&o.placeChanged.call(w,t)}function v(e){if(h){h.setCenter(e);var t=o.icon||o.placesIcon&&place.icon?place.icon:null;if(t){var n={url:t,size:new google.maps.Size(71,71),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(17,34),scaledSize:new google.maps.Size(35,35)};L.setIcon(n)}L.setPosition(e),L.setVisible(!0)}}var m,h,L,y,w=this,C=null,b=null,I=null,k=null;this.setValue=function(e){n.value=e,l(e)},this.getValue=function(){return n.value},this.setLocation=function(e,t){var n=new google.maps.LatLng(e,t);this.setLatLng(n)},this.getLocation=function(){var e=this.getLatLng();return{latitude:e&&e.lat()||o.latitude,longitude:e&&e.lng()||o.longitude}},this.setLatLng=function(e){s(k=e)},this.getLatLng=function(){return I&&I.geometry?I.geometry.location:k},this.getMap=function(){return h},this.reload=function(){h&&l(n.value)},this.resize=function(){if(h){var e=h.getCenter();google.maps.event.trigger(h,"resize"),h.setCenter(e)}},this.geoLocation=function(e){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(t){var n=new google.maps.LatLng(t.coords.latitude,t.coords.longitude);v(n),s(n),e&&e(n)},function(){e&&e(null)}):e&&e(null)},d.call(this)}var o="placepicker",a={map:"",mapIconClass:"glyphicon glyphicon-globe",mapOptions:{zoom:15},places:{icons:!1},autoCompleteOptions:{},placeChanged:null,location:null,preventSubmit:!0},i=n;e.fn[o]=function(t){return this.each(function(){return e(this).data(o)||e(this).data(o,new i(this,e.extend({},a,t,e(this).data()))),e(this)})}}(jQuery,window);