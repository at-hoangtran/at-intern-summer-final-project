var line_item={initController:function(){line_item.eventShowDetails()},tokenForm:function(){return $('meta[name="csrf-token"]').attr("content")},eventShowDetails:function(){$(".show-details").on("click",function(){var t=$(this).attr("details-id");line_item.ajaxShowDetails(t),line_item.eventApprove(t),line_item.eventReject(t)})},ajaxShowDetails:function(t){$.ajax({url:"/admin/orders/"+t,type:"GET",contentType:"application/json; charset=utf-8",dataType:"JSON",success:function(t){var e="",n=$("#data-template").html(),i=0,o="/assets/no-product-image-0f35e2b34a82f17cac95766bab3727091fc29403eeb8c3241290ba8a086b600d.png";$.each(t,function(t,a){images=a.product.images.length,images=images>0?a.product.images[0].url:o,e+=Mustache.render(n,{ID:a.id,IMAGE:images,NAME:a.product.name,PRICE:line_item.formatPrice(a.amount)+" \u0111",STATUS:a.product.quantity<1,STATUS1:a.product.quantity>1}),i+=a.amount}),$("tbody#viewLoad").html(e),$("strong#totalPri").html(I18n.t("javascripts.include.admin.line_item.total_price")+": "+line_item.formatPrice(i)+" \u0111"),"notdefined"===t[0].order.status?$("a#btn-xn, a#btn-h").attr("disabled",!1):$("#btn-xn, #btn-h").attr("disabled",!0)},error:function(t){console.log(t)}})},eventReject:function(t){$("#btn-h").on("click",function(){$.ajax({url:"/admin/orders/"+t+"/reject",method:"patch",beforeSend:function(t){t.setRequestHeader("X-CSRF-Token",line_item.tokenForm())},data:{id:t},success:function(e){e&&(line_item.ajaxShowDetails(t),line_item.reloadPage())},statusCode:{400:function(){line_item.not_enough_notify()}}})})},eventApprove:function(t){$("#btn-xn").on("click",function(){$.ajax({url:"/admin/orders/"+t+"/approve",method:"patch",beforeSend:function(t){t.setRequestHeader("X-CSRF-Token",line_item.tokenForm())},data:{id:t},success:function(e){e&&(line_item.ajaxShowDetails(t),line_item.reloadPage())},statusCode:{400:function(){line_item.not_enough_notify()}}})})},not_enough_notify:function(){$(".top-right").notify({message:{text:"Thao t\xe1c th\u1ea5t b\u1ea1i !"}}).show()},formatPrice:function(t){return t.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")},reloadPage:function(){setTimeout(function(){location.reload()},1e3)}};$(document).ready(function(){line_item.initController()});