var product={initController:function(){product.showDetails()},showDetails:function(){$(".show-details").on("click",function(){var t=$(this).attr("details-id");$.ajax({url:"/admin/products/"+t,type:"GET",contentType:"application/json; charset=utf-8",dataType:"JSON",async:!1,success:function(e){var r="",o=$("#data-template-order").html();$.each(e,function(t,e){r+=Mustache.render(o,{ID:e.id,NAME:e.user_name,ADDRESS:e.address,PHONE:e.phone,EMAIL:e.user.email,DATETIME:product.formatDateTime(e.created_at),PRICE:product.formatPrice(e.total_price)+" \u0111"})}),$("tbody#viewLoadOrder").html(r),$("#btn-remove-product").attr("href","/admin/products/"+t)},error:function(t){console.log(t)}})})},formatPrice:function(t){return t.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")},formatDateTime:function(t){var e=new Date(t);return dateTime=moment(e).format("DD/MM/YYYY"),dateTime}};$(document).ready(function(){product.initController()});