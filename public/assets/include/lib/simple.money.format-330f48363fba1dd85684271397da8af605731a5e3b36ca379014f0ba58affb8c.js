!function(t){t.fn.simpleMoneyFormat=function(){function e(e,n,l){for(var i="",p=l.split(""),a=[],r=0,o="",u=p.length-1;u>=0;u--)o+=p[u],3==++r&&(a.push(o),r=0,o="");r>0&&a.push(o);for(u=a.length-1;u>=0;u--){for(var c=a[u].split(""),s=c.length-1;s>=0;s--)i+=c[s];u>0&&(i+=",")}"input"==n?t(e).val(i):t(e).empty().text(i)}this.each(function(n,l){var i=null,p=null;t(l).is("input")||t(l).is("textarea")?(p=t(l).val().replace(/,/g,""),i="input"):(p=t(l).text().replace(/,/g,""),i="other"),t(l).on("paste keyup",function(){p=t(l).val().replace(/,/g,""),e(l,i,p)}),e(l,i,p)})}}(jQuery),$(".price").simpleMoneyFormat();