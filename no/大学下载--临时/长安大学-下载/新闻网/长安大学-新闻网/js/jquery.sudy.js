/*
** sudymenu for webplus1
*/
(function($){var SudyMenu=function(option){this.option=option;this.menuData={};this.init()};SudyMenu.prototype.init=function(){var _this=this,_opt=this.option;var urlPath="/s/"+_opt.siteId+"/t/"+_opt.pageId+"/p/"+_opt.p+"/p.";_opt.urls=[urlPath+"jspy",urlPath+"htm"];_this.ajax(_opt.urls[0])};SudyMenu.prototype.getScript=function(str){var patt=new RegExp("<scrip[\\s\\S]*?>([\\s\\S]*?)<\\/script>","ig"),result,results="";while((result=patt.exec(str))!=null){results+=result[1]}return results};SudyMenu.prototype.getMenu=function(arr){var _this=this,_opt=this.option;var menu=[];$.each(arr||[],function(index,el){menu[index]={title:$("a",el).attr("title"),url:$("a",el).attr("href"),target:$("a",el).attr("target")}});return menu};SudyMenu.prototype.menuFilter=function(data,menuclass,menusplit,menuarrow){var _this=this,_opt=this.option,menuclass=menuclass||"",menusplit=menusplit||"",menuarrow=menuarrow||"";var $a=$(data).find("a");_this.menuData.script=_this.getScript(data);_this.menuData.menu=[];var $menu=$('<ul class="'+menuclass+'" />');$.each($a,function(index,a){_this.menuData.menu[index]={title:$(a).text(),url:$(a).attr("href"),target:$(a).attr("target")};var link=_this.menuData.menu[index];$menu.append('<li class="menu-item item-'+index+'">'+menusplit+'<a class="menu-link" href="'+link.url+'" target="'+link.target+'">'+link.title+"</a></li>")});return _this.submenuFilter($menu,menuarrow)};SudyMenu.prototype.submenuFilter=function($menu,arrow){var _this=this,_opt=this.option;eval(_this.menuData.script);if(eval("typeof linkset"+_opt.p)!=="undefined"){for(var i=0;i<_this.menuData.menu.length;i++){for(var j=1;j<=5;j++){var curmenu,submenu=arrow+'<ul class="sub-menu menulv-'+j+'" />';switch(j){case 1:eval("curmenu = linkset"+_opt.p+"["+i+"]");if(curmenu&&curmenu.length>0){_this.menuData.menu[i]["submenu"]=_this.getMenu(curmenu);$menu.children().eq(i).append(submenu);$.each(_this.menuData.menu[i]["submenu"],function(index,val){$(".sub-menu",$menu.children().eq(i)).append('<li class="sub-item item-'+i+"-"+index+'"><a calss="sub-link" href="'+val.url+'" target="'+val.target+'">'+val.title+"</a></li>")})}break;case 2:$.each(_this.menuData.menu[i]["submenu"]||[],function(index,val){eval("curmenu = linkset"+_opt.p+"_"+i+"_"+j+"["+index+"]");if(curmenu&&curmenu.length>0){val["submenu"]=_this.getMenu(curmenu);$(".sub-menu",$menu.children().eq(i)).children().eq(index).append(submenu);$.each(val["submenu"],function(idx,value){$(".sub-menu",$(".sub-menu",$menu.children().eq(i)).children().eq(index)).append('<li class="sub-item item-'+i+"-"+index+"-"+idx+'"><a href="'+value.url+'" target="'+value.target+'">'+value.title+"</a></li>")})}});break}}}}return $menu};SudyMenu.prototype.ajax=function(url){var _this=this,_opt=this.option;$.ajax({url:url,type:"GET",dataType:"html",cache:false}).done(function(data){_this.menuData.str=data;$(_opt.menuWrap).append(_this.menuFilter(data,_opt.menuClass,_opt.menuSplit,_opt.menuArrow));if(typeof _opt.complete==="function"){_opt.complete.call(_this)}}).fail(function(){_this.ajaxCount=_this.ajaxCount||0;_this.ajaxCount++;if(_this.ajaxCount&&_this.ajaxCount<5){if(_this.ajaxCount%2===0){_this.ajax(__opt.urls[0])}else{_this.ajax(__opt.urls[1])}}})};$.extend({sudyMenu:function(settings){var sudyMenuDefaultOption={siteId:null,pageId:null,p:null,menuWrap:null,menuClass:"wp-menu",menuSplit:"",menuArrow:"",complete:function(){}};var option=$.extend(true,{},sudyMenuDefaultOption,settings);return new SudyMenu(option)}});window.SudyMenu=SudyMenu})(window.jQuery);
/*
** sudyarticle for webplus1
*/
(function(b){SudyArticle=function(c,d){this.settings=d;this.items=this.settings.itemSelector?b(this.settings.itemSelector,c):b(c);this.articles=[];this.init()};SudyArticle.prototype.init=function(){var d=this,c=this.settings;switch(c.channelType){case"news":d.getNews();break;case"image":d.getImage();break}};SudyArticle.prototype.getNews=function(){var e=this,d=this.settings,c=this.items;b.each(c,function(f,g){var h={title:"",url:"",date:""};b("td",g).each(function(m,n){var q="filed"+m;var p=b.trim(b(n).text()||"");h[q]=p;var l=b(n).find("a");if(l.length>0){var k=l.attr("href")||"";var o=l.attr("title")||"";if(k.length>h.url.length){h.url=k}if(o.length>h.title.length){h.title=o}}if(/^(\d{4})?[-|\/]?(\d{1,2})[-|\/](\d{1,2})(\s+)?(\d{1,2})?[:]?(\d{1,2})?[:]?(\d{1,2})?$/.test(p)){h.date=p}if(/^\(\d+\)$/.test(p)){h.count=Number(p.match(/\d+/)[0])}var j=b(n).find("img");if(j.length>0){var i=j.attr("src")||"";if(/hasPic/.test(i)){h.hasPic=true}if(/hots/.test(i)){h.isHot=true}if(/news/.test(i)){h.isNew=true}}});e.articles.push(h)})};SudyArticle.prototype.getImage=function(){var e=this,d=this.settings,c=this.items;b.each(c,function(f,g){var h={title:"",url:"",text:"",src:"",original:"",thumbnail:""};b("a",g).each(function(k,o){var n=b(o).attr("title")||"";var j=b(o).attr("href")||"";if(n.length>h.title.length){h.title=n}if(j.length>h.url.length){h.url=j}var l=b(o).find("img")||"";if(l.length>0){var m=l.attr("src");if(/\/picture\/article\//.test(m)){h.src=m;h.original=m.replace("_s","");var i=h.original.split(".");h.thumbnail=i[0]+"_s."+i[1]}}if(b(o).is("[class^='chan_con_']")){h.text=b.trim(b(o).html()||"")}});e.articles.push(h)})};var a={channelType:"news",itemSelector:""};b.fn.sudyArticle=function(e){var c=[];var d=b.extend(true,{},a,e);if(d.itemSelector){this.each(function(){c.push(new SudyArticle(this,d))})}else{c.push(new SudyArticle(this,d))}return c};b.extend({sudyArticle:function(d){var c=b.extend(true,{},a,d);return new SudyArticle(document,c)}})})(window.jQuery);
/*
** sudyTpl for javascript template
 */
!function(a){a.fn.sudyTpl=function(b){var c={p:null,json:null,callback:function(){}},d=a.extend(!0,{},c,b);return this.each(function(){var b=a(this),c=a('[type="text/template"]',b),e=[];if(null!==d.json?e=d.json:null!==d.p&&(e=getImgJson(d.p)),e.length>0){var f=c.get(0).text,g=f.match(/<!--LoopBegin-->[\s\S]*?<!--LoopEnd-->/gi),h=[];return a.each(g,function(b,c){c=c.replace(/<!--[\s\S]*?-->/g,""),h[b]="",a.each(e,function(a,d){h[b]+=c.replace(/\[%index%\]/g,a+1).replace(/\[%title%\]/g,d.title).replace(/(\/page\/main\d+\/|\/_upload[\s\S]*?\/template\d+\/)?\[%url%\]/g,d.url).replace(/(\/page\/main\d+\/|\/_upload[\s\S]*?\/template\d+\/)?\[%src%\]/g,d.src).replace(/\[%text%\]/g,d.text)}),f=f.replace(/<!--LoopBegin-->[\s\S]*?<!--LoopEnd-->/i,h[b])}),f=a.trim(f.replace(/(\n[\s|\t]*\r*\n)/g,"\n")),b.html(f),d.callback(b)}})}}(jQuery);

/*
sudyTouch for support touch
 */
(function(a){a.fn.sudyTouch=function(b){return this.each(function(){a(this).width();a(this).height();a(this).on("touchstart",function(f){var c=f.originalEvent.touches[0],e=Number(new Date),d=a(this).position();a.data(this,"touchstart",{posX:c.pageX,posY:c.pageY,timer:e,startX:d.left,startY:d.top});b.swipeStart&&b.swipeStart.call(this,d.left,d.top);return f.stopPropagation()}).on("touchmove",function(f){var c=f.originalEvent.touches[0],e=Number(new Date),d=c.pageX-a.data(this,"touchstart").posX,g=c.pageY-a.data(this,"touchstart").posY;deltaT=e-a.data(this,"touchstart").timer;a.data(this,"touchmove",{posX:c.pageX,posY:c.pageY,timer:e});b.swipeMove&&(f.preventDefault(),b.swipeMove.call(this,d,g,deltaT));(b.swipeRight||b.swipeLeft)&&Math.abs(d)>Math.abs(g)&&f.preventDefault();(b.swipeTop||b.swipeBottom)&&Math.abs(g)>Math.abs(d)&&f.preventDefault();return f.stopPropagation()}).on("touchend",function(f){var c=Number(new Date),e=a.data(this,"touchmove").posX-a.data(this,"touchstart").posX,d=a.data(this,"touchmove").posY-a.data(this,"touchstart").posY,g=c-a.data(this,"touchstart").timer;a.data(this,"touchend",{posX:a.data(this,"touchmove").posX,posY:a.data(this,"touchmove").posY,timer:c});c=Math.atan2(-d,e);if((30<Math.abs(e)||30<Math.abs(d))&&200>g){if(Math.abs(c)<Math.PI/4&&b.swipeRight)return b.swipeRight.call(this,e,d,g);if(Math.abs(c)>3*Math.PI/4&&b.swipeLeft)return b.swipeLeft.call(this,e,d,g);if(Math.PI/4<c&&c<3*Math.PI/4&&b.swipeTop)return b.swipeTop.call(this,e,d,g);if(3*-Math.PI/4<c&&c<-Math.PI/4&&b.swipeBottom)return b.swipeBottom.call(this,e,d,g)}b.swipeEnd&&b.swipeEnd.call(this,e,d,g);return f.stopPropagation()})})}})(jQuery);
/*
** sudyfocus
 */
(function($){$.fn.sudyfocus=function(opts){var defaults={p:null,json:[],title:{active:true,isAutoWidth:false,href:false},text:{active:false,isAutoHeight:false,href:false},href:true,zWidth:420,zHeight:270,response:true,navigation:true,isNavHover:true,pagination:false,thumbnail:false,effect:"slide",speed:500,crossfade:true,start:1,autoPlay:true,interval:5000,trigger:"click",bgColor:"#919191",zoom:false,callback:function(){},isMobile:false};var o=$.extend(true,{},defaults,opts),zW=o.zWidth,zH=o.zHeight,r=zW/zH;if(o.p!==null&&eval("typeof getImgJson")=="function"){o.json=getImgJson(o.p).concat(o.json)}function setfoucs(objs){$.each(objs,function(i,e){if("img_meta" in o.json[i]&&!$.isEmptyObject(o.json[i].img_meta)){var g=$(e).find("img").eq(0),fW=o.json[i].img_meta.focusWidth,fH=o.json[i].img_meta.focusHeight,fr=fW/fH,rW=o.json[i].img_meta.realWidth,rH=o.json[i].img_meta.realHeight,rr=rW/rH,pos={"X":o.json[i].img_meta.left,"Y":o.json[i].img_meta.top};var temX=pos.X,temY=pos.Y;pos.X=2*temX+fW<rW?0:2*temX+fW-rW;pos.Y=2*temY+fH<rH?0:2*temY+fH-rH;fW=pos.X==0?fW+2*temX:rW-pos.X;fH=pos.Y==0?fH+2*temY:rH-pos.Y;fr=fW/fH;var zoom,center={};if(fr<r){zoom=zW/fW;rW=zoom*rW;rH=rW/rr;fW=zW;fH=fW/fr;center.X=zoom*pos.X+fW/2;center.Y=zoom*pos.Y+fH/2}else{zoom=zH/fH;rH=zoom*rH;rW=rH*rr;fH=zH;fW=fH*fr;center.X=zoom*pos.X+fW/2;center.Y=zoom*pos.Y+fH/2}g.css({"display":"block","width":rW+"px","height":rH+"px","position":"absolute","left":zW/2-center.X+"px","top":zH/2-center.Y+"px"})}})}return this.each(function(){var c=$(this),pre=c.children(),preJSON=[];$.each(pre,function(i,e){var preData={};preData.title=$(e).attr("data-focus-title")||"";preData.url=$(e).attr("data-focus-url")||"";preData.text=$(e).attr("data-focus-text")||"";preData.original=$(e).attr("original-src")||e.src;preData.src=e.src;preData.width=e.width;preData.height=e.height;preJSON.push(preData)});o.json=preJSON.concat(o.json);c.html(function(index,html){var html="";$.each(o.json,function(){var zoom="";if(o.zoom){if(e.width/e.height>r){zoom='style="width:100%; height:auto;"'}else{zoom='style="width:auto; height:100%;"'}}html+='<img src="'+(this.original&&!o.isMobile?this.original:this.src)+'"'+zoom+">"});return html});if(o.json.length<1){return c.html("\u7a97\u53e3\u672a\u7ed1\u5b9a\u6216\u65e0\u6587\u7ae0")}c.children().wrap('<div class="focus-item" />').end().wrapInner('<div class="focus-container'+(o.zoom?" focus-zoom":"")+'"'+(o.zoom?' style="background-color:'+o.bgColor+';"':"")+" />");var u=$(".focus-container",c),l=$(".focus-item",u).hide(),len=l.length;if(o.title.active){$('<div class="focus-title-bar"><div class="focus-title-bg"></div><h2 class="focus-title"></h2></div>').appendTo(c)}if(o.text.active){$('<div class="focus-text-box"><div class="focus-text-bg"></div><div class="focus-text-inner"><p class="focus-text"></p></div></div>').appendTo(c)}if(o.navigation&&len>1){$('<a class="focus-navigation focus-prev">&lt;</a><a class="focus-navigation focus-next">&gt;</a>').appendTo(c)}if(o.pagination&&len>1){c.append(function(){var j,k,p=$('<div class="focus-pagination"></div>');for(j=0;j<len;j++){k=j+1;p.append('<a class="focus-page focus-page-'+k+'"><span>'+k+"</span></a>")}return p})}if(o.thumbnail&&len>1){c.append(function(){var j,k,p=$('<div class="focus-thumbnail"></div>');for(j=0;j<len;j++){k=j+1;p.append('<a class="focus-thumb focus-thumb-'+k+'"><span><img src="'+o.json[j].src+'" /></span></a>')}return p})}var $title=$(".focus-title-bar",c),$text=$(".focus-text-box",c),$nav=$(".focus-navigation",c),$pagi=$(".focus-pagination",c),$thumb=$(".focus-thumbnail",c),pages=$(".focus-page",$pagi),title=$(".focus-title",$title),thumbs=$(".focus-thumb",$thumb),text=$(".focus-text",$text);if(o.isNavHover){$nav.hide();c.hover(function(){$nav.show()},function(){$nav.hide()})}function resizeFocus(){c.css({width:zW+"px",height:zH+"px"}).addClass("focus-box");u.css({width:zW+"px",height:zH+"px",visibility:"visible"})}if(o.response){var W=c.parent().width();zW=W;zH=zW/r;$(window).resize(function(event){W=c.parent().width();zW=W;zH=zW/r;resizeFocus();setfoucs(l)})}resizeFocus();setfoucs(l);var index=o.start>len?len-1:o.start-1,current=index;var play={show:function(){l.eq(current).hide().end().eq(index).show()},slide:function(){l.eq(current).show().end().eq(index).show();if(len>1){function slideNext(){l.eq(index).css({left:"100%"});l.eq(current).stop(true,true).animate({left:"-100%"},o.speed);l.eq(index).stop(true,false).animate({left:"0%"},o.speed)}function slidePrev(){l.eq(index).css({left:"-100%"});l.eq(current).stop(true,true).animate({left:"100%"},o.speed);l.eq(index).stop(true,false).animate({left:"0%"},o.speed)}if((current==0&&index==len-1)||(current==len-1&&index==0)){if(current==0&&index==len-1){slidePrev()}if(current==len-1&&index==0){slideNext()}}else{if(index>current){slideNext()}if(index<current){slidePrev()}}}},fade:function(){if(o.crossfade){l.eq(current).stop().fadeOut(o.speed).end().eq(index).fadeIn(o.speed)}else{l.eq(current).stop().hide().end().eq(index).fadeIn(o.speed)
}}};function showIndex(){$title.hide();$text.hide();if(o.effect=="slide"){play.slide()}else{if(o.effect=="fade"){play.fade()}else{play.show()}}pages.removeClass("focus-page-active").eq(index).addClass("focus-page-active");thumbs.removeClass("focus-thumb-active").eq(index).addClass("focus-thumb-active");var $titleHtml=$.trim(o.json[index].title||""),$textHtml=$.trim(o.json[index].text||"");$url=$.trim(o.json[index].url||"");if($url!==""&&$url!=="#"){var $href=$('<a href="'+$url+'" target="_blank"></a>');if(o.href&&l.eq(index).find("a").length<1){l.eq(index).wrapInner($href)}if(o.title.href&&$titleHtml!==""){$titleHtml=$href.clone().html($titleHtml)}if(o.text.href&&$textHtml!==""){$textHtml=$href.clone().html($textHtml)}}if($titleHtml!==""){$title.show();title.html($titleHtml)}if($textHtml!==""){$text.show();text.html($textHtml)}if(o.title.isAutoWidth){title.parent().css("width",title.outerWidth())}if(o.text.isAutoHeight){text.parent().parent().css("height",text.outerHeight())}current=index;if(typeof o.callback==="function"){o.callback.call(this,index,o)}}function playNext(){index++;if(index>len-1){index=0}showIndex()}function playPrev(){index--;if(index<0){index=len-1}showIndex()}function autoPlay(){var timer;c.hover(function(){clearInterval(timer)},function(){timer=setInterval(function(){playNext()},o.interval)}).trigger("mouseleave")}if(o.autoPlay){autoPlay()}var prev=$(".focus-prev",c),next=$(".focus-next",c);prev.click(function(){playPrev()});next.click(function(){playNext()});pages.on(o.trigger,function(){index=$(this).index();showIndex()});thumbs.on(o.trigger,function(){index=$(this).index();showIndex()});if($.fn.sudyTouch){u.sudyTouch({"swipeStart":function(){c.trigger("mouseenter")},"swipeLeft":function(){playNext()},"swipeRight":function(){playPrev()},"swipeEnd":function(){c.trigger("mouseleave")}})}showIndex()})}})(jQuery);
/*
** other extends
 */
(function(a){a.fn.sudySelect=function(c){var d={handle:".select-name",selects:".select-list",trigger:"click",effect:"slide",speed:100,dir:"down",autoWidth:true},b=a.extend(true,{},d,c);return this.each(function(){var g=a(this),f=a(this).find(b.handle),e=a(this).find(b.selects),j=f.outerHeight();if(b.autoWidth){e.children().css({"padding-left":f.css("padding-left"),"padding-right":f.css("padding-right")})}if(b.dir=="down"){g.addClass("select-down");e.css({top:j+"px",bottom:"auto"})}else{if(b.dir=="up"){g.addClass("select-up");e.css({bottom:j+"px",top:"auto"})}}function i(){if(b.effect=="slide"){e.stop(true,true).slideDown(b.speed)}else{if(b.effect=="fade"){e.stop(true,true).fadeIn(b.speed)}else{$vp.show()}}}function h(){if(b.effect=="slide"){e.stop(true,false).slideUp(b.speed)}else{if(b.effect=="fade"){e.stop(true,false).fadeOut(b.speed)}else{e.hide()}}}f.on(b.trigger,function(){if(b.trigger=="click"){f.toggleClass("select-open");if(f.hasClass("select-open")){i()}else{h()}}else{f.addClass("select-open");i()}e.children().removeClass("hover")});g.on("mouseleave",function(){f.removeClass("select-open");h()});e.children().mouseenter(function(){a(this).addClass("hover").siblings().removeClass("hover")});e.children().on("click",function(){f.text(a(this).text());a(this).addClass("selected").siblings().removeClass("selected");f.removeClass("select-open");h()}).eq(0).trigger("click")})};a.fn.sudyPubdate=function(d){var f={target:".pubdate",lang:"num",separator:"-",format:"年月日",prefix_0:true,toUpper:true,tpl:'<div class="sudy-pubdate"><span class="pubdate-month">%m%月</span><span class="pubdate-day">%d%</span></div>'},c=a.extend(true,{},f,d);var e=["一","二","三","四","五","六","七","八","九","十","十一","十二"],h=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],g=["日","一","二","三","四","五","六"],b=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return this.each(function(){var k=a(this),i=a(this).find(c.target),l=a.trim(i.text()).split(c.separator),r=parseInt(l[c.format.indexOf("年")],10),q=parseInt(l[c.format.indexOf("月")],10),s=parseInt(l[c.format.indexOf("日")],10);var m=new Date(r,q,s);var j=m.getDay()+1;if(c.prefix_0){q=q<10?"0"+q:q;s=s<10?"0"+s:s}var n=e[m.getMonth()],o=g[m.getDay()];if(c.lang=="en"){n=c.toUpper?h[m.getMonth()].toUpperCase():h[m.getMonth()];o=c.toUpper?b[m.getDay()].toUpperCase():b[m.getDay()]}var p=c.tpl.replace("%Y%",r).replace("%m%",q).replace("%d%",s).replace("%w%",j).replace("%M%",n).replace("%W%",o);i.html(p)})};a.fn.sudyTab=function(c){var d={handle:".tab-menu > li",content:".tab-list > li,.tab-more > li",trigger:"mouseenter",start:1,autoPlay:{active:false,interval:4000,pauseHover:true}},b=a.extend(true,{},d,c);return this.each(function(){var g=a(this),h=g.find(b.handle),f=b.content.split(","),l=b.start-1,e=h.length,j=l;a.each(h,function(o,n){a(n).on(b.trigger,function(m){m.preventDefault();j=o;h.removeClass("selected");a(this).addClass("selected");a.each(f,function(p,q){g.find(q).removeClass("active").hide();g.find(q).eq(o).addClass("active").show()});return false})});if(b.autoPlay.active){var k,j;var i=function(m){h.eq(m).trigger(b.trigger);k=setTimeout(function(){m++;if(m>e-1){m=0}i(m)},b.autoPlay.interval)};i(l);g.hover(function(){clearTimeout(k)},function(){i(j)})}else{h.eq(l).trigger(b.trigger)}})};a.fn.sudyInput=function(c){var d={tip:".tip"},b=a.extend(true,{},d,c);return this.each(function(){var e=a(this),h=a(this).find(b.tip),g=a(this).find("input,textarea");function f(){var i=g.val();if(i!==h.text()&&i!==""){h.hide()}else{h.show();g.val("")}}e.click(function(){g.trigger("focus")});g.focus(function(){h.hide()});g.blur(function(){f()})})};a.fn.sudyClock=function(e){var f={format:"%Y%年%M%月%D%日 %N% %H%:%m%:%s% %W% 距离100周年国庆还有 %CD% 天",hour12:false,noon:"cn",week:"cn",countDown:"2049/10/1"},d=a.extend(true,{},f,e),c=function(h){var g=parseInt(h);if(g<10){g="0"+g}return g},b=function(){var h=new Date(),g=h.getFullYear(),k=h.getMonth()+1,p=h.getDate(),o=h.getHours(),l=h.getMinutes(),n=h.getSeconds(),m=d.week=="cn"?["星期日","星期一","星期二","星期三","星期四","星期五","星期六"][h.getDay()]:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][h.getDay()],j=d.noon=="cn"?["上午","下午"][o<12?0:1]:["AM","PM"][o<12?0:1],i=0;o=d.hour12&&o>12?o-12:o;i=Math.ceil((Date.parse(d.countDown)-h.getTime())/86400000);return{Y:g,M:c(k),D:c(p),H:c(o),m:c(l),s:c(n),W:m,N:j,C:i}};return this.each(function(){var h=a(this),g;function i(){g=d.format.replace("%Y%",b().Y).replace("%M%",b().M).replace("%D%",b().D).replace("%H%",b().H).replace("%m%",b().m).replace("%s%",b().s).replace("%W%",b().W).replace("%N%",b().N).replace("%CD%",b().C);h.html(g);setTimeout(function(){i()},500)}i()})};a.fn.sudyLinks=function(c){var d={handle:".links-name",wrap:".links-wrap",trigger:"mouseenter",effect:"show",speed:300,hidePause:0,type:"elink",width:"block",position:true},b=a.extend(true,{},d,c);return this.each(function(){var g=a(this),e=a(this).find(b.handle),h=a(this).find(b.wrap),i=e.outerHeight(),k="",j,f=h.outerHeight(),i=h.css("bottom");
if("block"==b.width){g.css("display","block");e.css("display","block")}if(/\d+/.test(b.width)){g.css("width",b.width);e.css("display","block")}if(b.type=="elink"){h.css("width",g.width()-2)}e.on(b.trigger,function(n){n.preventDefault();clearTimeout(j);var m=g.offset().top,l=a(window).scrollTop();var o=m-l;if(b.position){g.css("position","relative");if(o<f){h.css({bottom:"auto",top:i})}else{h.css({top:"auto",bottom:i})}}e.addClass("wrap-open");if(b.effect=="slide"){h.stop(true,true).hide().slideDown(b.speed)}else{if(b.effect=="fade"){h.stop(true,true).hide().fadeIn(b.speed)}else{h.show()}}return false});g.mouseleave(function(l){j=setTimeout(function(){if(b.position){g.css("position","static")}e.removeClass("wrap-open");if(b.effect=="slide"){h.stop(true,true).slideUp(b.speed)}else{if(b.effect=="fade"){h.stop(true,true).fadeOut(b.speed)}else{h.hide()}}},b.hidePause);return false})})};a.fn.sudyScroll=function(c){var d={width:200,height:100,display:2,step:2,dir:"y",auto:true,speed:500,hoverPause:5000,navigation:true,navTrigger:"click",pagination:true,pagTrigger:"mouseenter"},b=a.extend(true,{},d,c);return this.each(function(){a(this).wrap('<div class="sudy-scroll-wrap" />');var i=a(this),o=a(this).children(),q=o.length,m=a(this).parent(),h="scroll-"+Number(new Date()),t=Math.ceil(q/b.step),p=0,l=0,r=0;b.step=b.step>b.display?b.display:b.step;m.wrap('<div class="sudy-scroll" id="'+h+'" />');var n=a(this).parent().parent();if(b.dir=="x"){n.css({width:b.width*b.display+"px"});m.css({width:b.width*b.display+"px"});i.css({width:b.width*q+"px",position:"absolute",left:"0px",top:"0px"});o.css({width:b.width+"px","float":"left",display:"inline-block"})}else{n.css({height:b.height*b.display+"px"});m.css({height:b.height*b.display+"px"});i.css({position:"absolute",left:"0px",top:"0px"});o.css({height:b.height+"px"})}if(b.navigation){n.append('<div class="sudy-scroll-nav"><a href="javascript:;" class="nav-prev">&lt;</a><a href="javascript:;" class="nav-next">&gt;</a></div>')}if(b.pagination){var s='<div class="sudy-scroll-page">';a.each(new Array(t),function(u,v){s=s+'<a class="page-index page-'+u+'" href="javascript:;"><span>'+u+"</span></a>"});n.append(s)}function f(){a(".page-index",n).eq(p).addClass("active").siblings().removeClass("active")}function k(){if(b.dir=="x"){l=-p*b.step*b.width;i.stop().animate({left:l+"px"},b.speed)}else{r=-p*b.step*b.height;i.stop().animate({top:r+"px"},b.speed)}f()}k(p);function j(){p++;if(p>t-1){p=0}k(p)}function e(){p--;if(p<0){p=t-1}k(p)}if(b.auto){var g;n.hover(function(){clearTimeout(g)},function(){g=setTimeout(function(){j();n.trigger("mouseleave")},b.hoverPause)}).trigger("mouseleave")}a(".nav-next",n).on(b.navTrigger,function(){j()});a(".nav-prev",n).on(b.navTrigger,function(){e()});a(".page-index",n).on(b.pagTrigger,function(){p=a(this).index();k(p)});if(a.fn.sudyTouch){i.sudyTouch({"swipeLeft":function(){j()},"swipeRight":function(){e()}})}})}})(jQuery);