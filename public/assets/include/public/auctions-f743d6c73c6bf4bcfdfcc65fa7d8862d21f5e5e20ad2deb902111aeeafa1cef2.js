var auctions={AppOnLoad:function(){app_auctions=App.auctions},loadElementToHtml:function(a){var t="",e=$("#data-template").html(),o="/assets/no-product-image-0f35e2b34a82f17cac95766bab3727091fc29403eeb8c3241290ba8a086b600d.png";e&&($.each(a.obj,function(a,c){images=c.product_image.length,images=images>0?c.product_image[0].url:o,t+=Mustache.render(e,{ID:c.id,IMAGE:images,PRICE:formatPrice(c.product_price),TIMER:fmtMSS(c.period)})}),$(".load-data").html(t))}};$(document).ready(function(){auctions.AppOnLoad()});