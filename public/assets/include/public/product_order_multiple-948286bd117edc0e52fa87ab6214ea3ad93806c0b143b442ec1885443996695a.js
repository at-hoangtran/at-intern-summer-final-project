var product_order_multiple={loadElementToHtml:function(t){var r="",e=$("#data-template").html();e&&($.each(t.obj,function(t,u){product_order_multiple.check_product(u.product_id)&&(r+=Mustache.render(e,{ID:u.id,IMAGE:u.product_image[0].url,PRICE:formatPrice(u.product_price),TIMER:fmtMSS(u.period)}))}),$(".load-data-product-order-multi").html(r))},check_product:function(t){request=product_order_multiple.request_product();for(var r=0;r<request.length;r++)if(t==request[r].product_id)return!0;return!1},request_product:function(){return product_id=null,$.ajax({url:"/product_muti",type:"GET",contentType:"application/json; charset=utf-8",dataType:"JSON",async:!1,success:function(t){product_id=t},error:function(t){console.log(t)}}),product_id}};