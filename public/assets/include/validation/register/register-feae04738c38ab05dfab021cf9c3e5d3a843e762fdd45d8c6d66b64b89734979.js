$(document).ready(function(){$("#frmRegister").validate({ignore:[],rules:{"user[name]":{required:!0,maxlength:255,minlength:6},"user[email]":{required:!0,maxlength:255,minlength:6,email:!0,remote:"/users/check_email"},"user[password]":{required:!0,minlength:6},"user[password_confirmation]":{required:!0,minlength:6,equalTo:"#password_r"}},messages:{"user[name]":{required:"Vui l\xf2ng nh\u1eadp h\u1ecd t\xean !",maxlength:"name qu\xe1 255 k\xfd t\u1ef1 !",minlength:"name ph\u1ea3i t\u1ed1i thi\u1ec3u 6 k\xfd t\u1ef1 !"},"user[email]":{required:"Vui l\xf2ng nh\u1eadp email !",email:"Email b\u1ea1n kh\xf4ng h\u1ee3p l\u1ec7 !",maxlength:"Email qu\xe1 50 k\xfd t\u1ef1 !",minlength:"Email ph\u1ea3i t\u1ed1i thi\u1ec3u 6 k\xfd t\u1ef1 !",remote:"Email n\xe0y \u0111\xe3 t\u1ed3n t\u1ea1i !"},"user[password]":{required:"Vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u !",minlength:"M\u1eadt kh\u1ea9u t\u1ed1i thi\u1ec3u 6 k\xfd t\u1ef1 !"},"user[password_confirmation]":{required:"Vui l\xf2ng nh\u1eadp m\u1eadt kh\u1ea9u !",minlength:"M\u1eadt kh\u1ea9u t\u1ed1i thi\u1ec3u 6 k\xfd t\u1ef1 !",equalTo:"M\u1eadt kh\u1ea9u nh\u1eadp l\u1ea1i kh\xf4ng kh\u1edbp !"}},highlight:function(e){$(e).closest(".control-group").addClass("has-error")},unhighlight:function(e){$(e).closest(".control-group").removeClass("has-error")},errorElement:"span",errorClass:"help-block",errorPlacement:function(e,r){r.parent(".input-group").length?e.insertAfter(r.parent()):e.insertAfter(r)}})});