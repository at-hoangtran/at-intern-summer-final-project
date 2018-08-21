(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/vi_VN/all.js#xfbml=1&appId=265774133440908";
  fjs.parentNode.insertBefore(js, fjs);
  $(".fb-comments").attr("data-href", window.location.href)
}(document, 'script', 'facebook-jssdk'));

$(document).ready(function(){
  $('.fb-share-button').attr('data-href', window.location.href );
});
