$(document).ready(function(){$("#frmAddProduct").validate({ignore:[],rules:{"product[category_id]":{required:!0},"product[name]":{required:!0},"product[price]":{required:!0,number:!0,minprice:0},"product[quantity]":{required:!0,number:!0,minsize:0},"product[description]":{required:!0,minlength:20},"product[images][]":{accept:"jpg,png,jpeg,gif",filesize:3024e3,mximg:!0}},messages:{"product[category_id]":{required:"Vui l\xf2ng ch\u1ecdn danh m\u1ee5c !"},"product[name]":{required:"Vui l\xf2ng nh\u1eadp t\xean s\u1ea3n ph\u1ea9m !"},"product[price]":{required:"Vui l\xf2ng nh\u1eadp g\xeda !",number:"Vui l\xf2ng nh\u1eadp s\u1ed1 !",minprice:"Vui l\xf2ng nh\u1eadp ti\u1ec1n kh\xf4ng \u0111\u01b0\u1ee3c \xe2m !"},"product[quantity]":{required:"Vui l\xf2ng nh\u1eadp s\u1ed1 l\u01b0\u1ee3ng !",number:"Vui l\xf2ng nh\u1eadp s\u1ed1 l\u01b0\u1ee3ng !",minsize:"S\u1ed1 l\u01b0\u1ee3ng t\u1ed1i thi\u1ec3u 1 s\u1ea3n ph\u1ea9m !"},"product[description]":{required:"Vui l\xf2ng nh\u1eadp m\xf4 t\u1ea3 !",minlength:"M\xf4 t\u1ea3 t\u1ed1i thi\u1ec3u 20 k\xfd t\u1ef1 !"},"product[images][]":{accept:"Ki\u1ec3u t\u1ec7p kh\xf4ng h\u1ee3p l\u1ec7 !",filesize:"File dung l\u01b0\u1ee3ng t\u1ed1i \u0111a kh\xf4ng qu\xe1 3mb !",mximg:"Vui l\xf2ng ch\u1ecdn t\u1ed1i \u0111a 4 h\xecnh \u1ea3nh !"}},highlight:function(e){$(e).closest(".control-group").addClass("has-error")},unhighlight:function(e){$(e).closest(".control-group").removeClass("has-error")},errorElement:"span",errorClass:"help-block",errorPlacement:function(e,i){i.parent(".input-group").length?e.insertAfter(i.parent()):e.insertAfter(i)}}),$(".submit-ckediter").on("click",function(){CKEDITOR.instances.description.updateElement()})}),$.validator.addMethod("minsize",function(e,i,n){return e>n}),$.validator.addMethod("minprice",function(e,i,n){return e.replace(/,/gi,"")>n}),$.validator.addMethod("mximg",function(e,i){return i.files.length<=4}),$.validator.addMethod("filesize",function(e,i,n){return this.optional(i)||i.files[0].size<=n},"File size must be less than {0}");