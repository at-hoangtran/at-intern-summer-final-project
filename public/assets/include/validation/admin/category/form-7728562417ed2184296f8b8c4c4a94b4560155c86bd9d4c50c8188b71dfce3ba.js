$(document).ready(function(){$("#frmCategory").validate({ignore:[],rules:{"category[name]":{required:!0}},messages:{"category[name]":{required:"Vui l\xf2ng nh\u1eadp t\xean danh m\u1ee5c !"}},highlight:function(r){$(r).closest(".control-group").addClass("has-error")},unhighlight:function(r){$(r).closest(".control-group").removeClass("has-error")},errorElement:"span",errorClass:"help-block",errorPlacement:function(r,e){e.parent(".input-group").length?r.insertAfter(e.parent()):r.insertAfter(e)}})});