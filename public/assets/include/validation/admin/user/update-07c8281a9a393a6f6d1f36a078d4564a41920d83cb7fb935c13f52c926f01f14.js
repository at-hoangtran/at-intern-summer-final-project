$(document).ready(function(){$("#frmAddUserEdit").validate({ignore:[],rules:{"user[name]":{required:!0,maxlength:30},"user[email]":{required:!0,maxlength:50,minlength:6,email:!0},"user[address]":{required:!0},"user[phone]":{required:!0,number:!0,minlength:9,maxlength:15},"user[image]":{accept:"jpg,png,jpeg,gif"}},messages:{"user[name]":{required:"Vui l\xf2ng nh\u1eadp h\u1ecd t\xean !",maxlength:"H\u1ecd t\xean kh\xf4ng qu\xe1 30 k\xfd t\u1ef1 !"},"user[email]":{required:"Vui l\xf2ng nh\u1eadp email !",email:"Email kh\xf4ng \u0111\xfang \u0111\u1ecbnh d\u1ea1ng !",maxlength:"Email kh\xf4ng qu\xe1 50 k\xfd t\u1ef1 !",minlength:"Email t\u1ed1i thi\u1ec3u 6 k\xfd t\u1ef1 !"},"user[address]":{required:"Vui l\xf2ng nh\u1eadp \u0111\u1ecba ch\u1ec9"},"user[phone]":{required:"Vui l\xf2ng nh\u1eadp s\u1ed1 \u0111i\u1ec7n tho\u1ea1i !",number:"Vui l\xf2ng nh\u1eadp s\u1ed1 !",minlength:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i t\u1ed1i thi\u1ec3u 9 k\xfd t\u1ef1 !",maxlength:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i kh\xf4ng qu\xe1 15 k\xfd t\u1ef1 !"},"user[image]":{accept:"\u0110\u1ecbnh d\u1ea1ng kh\xf4ng \u0111\xfang (jpg, png, gif)"}},highlight:function(e){$(e).closest(".control-group").addClass("has-error")},unhighlight:function(e){$(e).closest(".control-group").removeClass("has-error")},errorElement:"span",errorClass:"help-block",errorPlacement:function(e,n){n.parent(".input-group").length?e.insertAfter(n.parent()):e.insertAfter(n)}})});