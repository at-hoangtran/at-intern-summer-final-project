$(document).ready(function(){$("#frmLogin").validate({ignore:[],rules:{"user[email]":{required:!0,maxlength:50,minlength:6,email:!0},"user[password]":{required:!0,minlength:6}},messages:{"user[email]":{required:"Vui l\xf2ng nh\u1eadp email !",email:"Vui l\xf2ng nh\u1eadp \u0111\xfang \u0111\u1ecbnh d\u1ea1ng email !",maxlength:"Vui l\xf2ng nh\u1eadp email kh\xf4ng qu\xe1 50 k\xfd t\u1ef1 !",minlength:"Vui l\xf2ng nh\u1eadp email t\u1ed1i thi\u1ec3u 6 k\xfd t\u1ef1 !"},"user[password]":{required:"Vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u !",minlength:"Vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u t\u1ed1i thi\u1ec3u 6 k\xfd t\u1ef1 !"}},highlight:function(e){$(e).closest(".control-group").addClass("has-error")},unhighlight:function(e){$(e).closest(".control-group").removeClass("has-error")},errorElement:"span",errorClass:"help-block",errorPlacement:function(e,n){n.parent(".input-group").length?e.insertAfter(n.parent()):e.insertAfter(n)}})});