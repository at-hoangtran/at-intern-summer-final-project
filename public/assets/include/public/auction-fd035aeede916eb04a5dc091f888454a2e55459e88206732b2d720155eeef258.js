var auction={current_price:0,tmp_price:0,step:0,loadElementToHtml:function(i){if(i=i.obj,period=fmtMSS(i.period),price=formatPrice(i.product_price),images=i.product_image,description=i.product_description,product_name=i.product_name,step=i.step,category_name=i.category_name,$(".clock-time-show").html(period),$(".price-crt").html(price),$(".title-product").html(category_name),car_inner=$(".carousel-inner").html(),car_indicators=$(".carousel-indicators").html(),""==car_inner&&""==car_indicators)if(images.length>0)images.forEach(function(i,t){active=0==t?"active":"",html_inner='<div class="item '+active+'">',html_inner+='<img src="'+i.url+'">',html_inner+="</div>",$(".carousel-inner").append(html_inner),html_indi='<li class="'+active+'" data-slide-to="'+t+'" data-target="#article-photo-carousel">',html_indi+='<img src="'+i.url+'">',html_indi+="</li>",$(".carousel-indicators").append(html_indi)});else{var t="/assets/no-product-image-0f35e2b34a82f17cac95766bab3727091fc29403eeb8c3241290ba8a086b600d.png";html_inner='<div class="item active">',html_inner+='<img src="'+t+'">',html_inner+="</div>",html_indi='<li class="active" data-slide-to="0" data-target="#article-photo-carousel">',html_indi+='<img src="'+t+'">',html_indi+="</li>",$(".carousel-inner").append(html_inner),$(".carousel-indicators").append(html_indi)}$(".description").html(description),$(".description").html(description),$(".btn-price-timer").attr("load-id",i.id),auction.load_default_price_input(i.product_price,step),auction.refresh_page(i.period)},load_default_price_input:function(i,t){i!==auction.current_price&&(auction.current_price=i,auction.tmp_price=i,$("#price-input").val(formatPrice(i)+" \u0110"),auction.event_add_btn_price(i,t),auction.step=t)},event_add_btn_price:function(i,t){$(".btn-sub").prop("disabled",!0),$(".btn-sub").on("click",function(){auction.tmp_price-=t,$("#price-input").val(formatPrice(auction.tmp_price+" \u0110")),auction.tmp_price===auction.current_price&&$(".btn-sub").prop("disabled",!0)}),$(".btn-add").on("click",function(){auction.tmp_price+=t,$("#price-input").val(formatPrice(auction.tmp_price+" \u0110")),auction.tmp_price!==auction.current_price&&$(".btn-sub").prop("disabled",!1)})},event_submit_price:function(){$(".price-btn-submit").on("click",function(){auction.tmp_price===auction.current_price&&(auction.tmp_price+=auction.step),data={price:auction.tmp_price,user_id:conntected_disconnected.load_id_current_user()},App.auction.send(data)})},refresh_page:function(i){0==i&&($(".loadbid").children().remove(),$(".user-win").html(""))}};$(document).ready(function(){auction.event_submit_price()});