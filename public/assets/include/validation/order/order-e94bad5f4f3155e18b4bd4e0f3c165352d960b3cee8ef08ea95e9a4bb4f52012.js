$(document).ready(function(){$("#formOrder").validate({ignore:[],rules:{"order[user_name]":{required:!0,maxlength:30},"order[address]":{required:!0},"order[phone]":{required:!0,number:!0,maxlength:15,minlength:9}},messages:{"order[user_name]":{required:"Vui l\xf2ng nh\u1eadp h\u1ecd t\xean!",maxlength:"H\u1ecd t\xean kh\xf4ng qu\xe1 30 k\xed t\u1ef1!"},"order[address]":{required:"Vui l\xf2ng nh\u1eadp \u0111\u1ecba ch\u1ec9!"},"order[phone]":{required:"Vui l\xf2ng nh\u1eadp s\u1ed1 \u0111i\u1ec7n tho\u1ea1i!",number:"Sai \u0111inh d\u1ea1ng, vui l\xf2ng nh\u1eadp s\u1ed1",maxlength:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i kh\xf4ng qu\xe1 15 k\xed t\u1ef1!",minlength:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i t\u1ed1i thi\u1ec3u 9 k\xed t\u1ef1!"}},highlight:function(e){$(e).closest(".control-group").addClass("has-error")},unhighlight:function(e){$(e).closest(".control-group").removeClass("has-error")},errorElement:"span",errorClass:"help-block",errorPlacement:function(e,r){r.parent(".input-group").length?e.insertAfter(r.parent()):e.insertAfter(r)}})});