$(function(){
	var headNav = {
			hideTimeObj : {},
			animateTime : 300,
			isNavHover : false,
			isMoreHover : false
		},
		bannerObj = {
			timeOut : {},
			time : 5000,
			isMove : true,
			animateTime : 600
		},
		topicRight = {
			timeOut : {},
			time : 4000,
			isMove : true,
			animateTime : 300
		};
	
	
	
	/*header*/
	$(".head-nav").find(".center a").hover(function(){
		var $navLi = $(".head-nav").find(".center a"),
			$navActive = $(".head-nav").find(".center a.active"),
			index = $navLi.index($(this)[0]),
			$moreMain = $(".head-nav").find(".head-more"),
			$moreLi = $moreMain.find(".item");

		if(!index){//首页无更多展示 || index===$navLi.length-1
			return false;
		}

		headNav.isNavHover = true;
		clearTimeout(headNav.hideTimeObj);
		$navActive.removeClass("active");
		$navLi.eq(index).addClass("active");
		$moreLi.eq(index-1).show();
		$moreLi.not($moreLi.eq(index-1)).hide();
		$moreMain.stop().fadeIn();
	},function(){
		var $navLi = $(".head-nav").find(".center a"),
			index = $navLi.index($(this)[0]),
			$moreMain = $(".head-nav").find(".head-more"),
			$moreLi = $moreMain.find(".item");
		
		headNav.isNavHover = false;
		if(headNav.isNavHover || headNav.isMoreHover){
			$moreLi.eq(index).hide();
		}else{
			headNav.hideTimeObj = setTimeout(function(){
				$navLi.eq(index).removeClass("active");
				$moreMain.stop().fadeOut(headNav.animateTime,function(){
					$moreLi.eq(index).hide();
				});
			},headNav.animateTime);
		}
	});
	$(".head-nav").find(".head-more").hover(function(){
		headNav.isMoreHover = true;
		clearTimeout(headNav.hideTimeObj);
	},function(){
		var $navLi = $(".head-nav").find(".center a"),
			$active = $(".head-nav").find(".center a.active"),
			index = $navLi.index($active[0]),
			$moreMain = $(".head-nav").find(".head-more"),
			$moreLi = $moreMain.find(".item");
		
		headNav.isMoreHover = false;
		if(!headNav.isNavHover && !headNav.isMoreHover){
			headNav.hideTimeObj = setTimeout(function(){
				$active.removeClass("active");
				$moreMain.stop().fadeOut(headNav.animateTime,function(){
					$moreLi.eq(index).hide();
				});
			},headNav.animateTime);
		}
	});
	$(".head-nav").find(".head-more .tit a").hover(function(){
		var $this = $(this),
			$main = $this.parent(),
			$a = $main.find("a"),
			$dom = $main.find("div"),
			index = $a.index($this[0]),
			left = 0,
			wid = 0;

		for(var i=0,len=index;i<len;i++){
			left += parseInt($a.eq(i).css("paddingLeft"),10)*2+$a.eq(i).width()+parseInt($a.eq(i).css("marginRight"),10);
		}
		$a.eq(0).removeClass("active");
		$dom.stop().animate({"left":left+"px"});
		$dom.width( parseInt($a.eq(index).css("paddingLeft"),10)*2+$a.eq(index).width() );
	},function(){
		var $this = $(this),
			$main = $this.parent(),
			$a = $main.find("a"),
			$dom = $main.find("div");
		$a.eq(0).addClass("active");
		$dom.stop().animate({"left":0+"px"});
		$dom.width(parseInt($a.eq(0).css("paddingLeft"),10)*2+$a.eq(0).width());
	});
	
	/*banner*/
    $(".banner").find('li').eq(0).fadeIn(bannerObj.animateTime,function(){
        $(".banner").find('li').eq(0).addClass("active");
	});
	$(".banner").find(".list-left").click(function(){
		var $main = $(".banner").find("ul"),
			isLock = $main.attr("islock"),
			$item = $main.find("li"),
			$pet = $main.find(".active"),
			$index = ~$item.index($pet)?$item.index($pet):0,
			len = $item.length;
			
		if(!~~isLock){//按钮锁
			return false;	
		}	
		$main.attr("islock","0");
        $pet.removeClass("active");
        if(len>1){
            fadeOuts();
            fadeIns();
		}else{
            fadeOuts(fadeIns);
		}

		function fadeIns(){
            $item.eq($index<=0?(len-1):($index-1)).stop().fadeIn(bannerObj.animateTime,function(){
                $item.eq($index<=0?(len-1):($index-1)).addClass("active");
            });
		}
		function fadeOuts(fun){
            $item.eq($index).fadeOut(bannerObj.animateTime,function(){
                $main.attr("islock","1");
                fun ? (fun()):"";
            });
		}
	});
	$(".banner").find(".list-right").click(function(){
		var $main = $(".banner").find("ul"),
			isLock = $main.attr("islock"),
			$item = $main.find("li"),
            $pet = $main.find(".active"),
            $index = ~$item.index($pet)?$item.index($pet):0,
			len = $item.length;

		if(!~~isLock){//按钮锁
			return false;	
		}	
		$main.attr("islock","0");
        $pet.removeClass("active");
        if(len>1){
            fadeOuts();
            fadeIns();
        }else{
            fadeOuts(fadeIns);
        }
        function fadeIns(){
            $item.eq(len<=$index+1?0:($index+1)).stop().fadeIn(bannerObj.animateTime,function(){
                $item.eq(len<=$index+1?0:($index+1)).addClass("active");
            });
        }
        function fadeOuts(fun){
            $item.eq($index).fadeOut(bannerObj.animateTime,function(){
                $main.attr("islock","1");
                fun ? (fun()):"";
            });
        }
	});
	function automaticBanner(){
		bannerObj.timeOut = setTimeout(function(){
			if(bannerObj.isMove){
				$(".banner").find(".list-right").trigger("click");
				automaticBanner();
			}
		},bannerObj.time);
	}
	automaticBanner();
	$(".banner").hover(function(){
		clearTimeout(bannerObj.timeOut);
		bannerObj.isMove = false;
	},function(){
		bannerObj.isMove = true;
		automaticBanner();
	});
	$(window).resize(function(){
		var $main = $(".banner").find("ul");
		$main.css("left","0px");
	});
	
	
	
	
	/*topic-left*/
	$(".index-topic").find(".left .btn-left").click(function(){
		var $main = $(".index-topic").find(".left .list-main"),
			isLock = $main.attr("islock"),
			$item = $main.find("a"),
			marginRig = parseInt($item.css("margin-right"),10),
			wid = $item.width() + marginRig,
			left = $main.position().left,
			len = $item.length;
		
		if(!~~isLock){//按钮锁
			return false;	
		}
		$main.attr("islock","0");
		if(left>=0){//到头
			$main.stop().animate({"left":100+"px"},300,function(){
				$main.stop().animate({"left":0+"px"},300,function(){
					$main.attr("islock","1");
				});
			});
		}else{
			$main.stop().animate({"left":left+wid+"px"},300,function(){
				$main.attr("islock","1");
			});
		}
	});
	$(".index-topic").find(".left .btn-right").click(function(){
		var $main = $(".index-topic").find(".left .list-main"),
			isLock = $main.attr("islock"),
			$item = $main.find("a"),
			marginRig = parseInt($item.css("margin-right"),10),
			wid = $item.width()+marginRig,
			left = $main.position().left,
			len = $item.length;
		
		if(!~~isLock){//按钮锁
			return false;	
		}
		$main.attr("islock","0");
		if(left <= (-wid*(len-4))){//到头
			$main.stop().animate({"left":left-100+"px"},300,function(){
				$main.stop().animate({"left":left+"px"},300,function(){
					$main.attr("islock","1");
				});
			});
		}else{
			$main.stop().animate({"left":left-wid+"px"},300,function(){
				$main.attr("islock","1");
			});
		}
	});
	
	
	
	
	/*topic-right*/
	$(".index-topic").find(".right .btn-left").click(function(){
		var $main = $(".index-topic").find(".right .list-main"),
			isLock = $main.attr("islock"),
			$item = $main.find("div"),
			marginRig = parseInt($item.css("margin-right"),10),
			wid = $item.width() + marginRig,
			left = $main.position().left,
			len = $item.length,
			$iconActive = $(".index-topic").find(".right .list-item .active"),
			$iconList = $(".index-topic").find(".right .list-item div"),
			indexNum = $iconList.index($iconActive[0]);
			
		if(!~~isLock){//按钮锁
			return false;	
		}	
		$main.attr("islock","0");
		$iconActive.removeClass("active");
		if(left >= 0){//到头
			$iconList.eq(len-1).addClass("active");
			$main.stop().animate({"left":(-wid*(len-1))+"px"},topicRight.animateTime,function(){
				$main.attr("islock","1");
			});
		}else{
			$iconList.eq(--indexNum).addClass("active");
			$main.stop().animate({"left":left+wid+"px"},topicRight.animateTime,function(){
				$main.attr("islock","1");
			});
		}
	});
	$(".index-topic").find(".right .btn-right").click(function(){
		var $main = $(".index-topic").find(".right .list-main"),
			isLock = $main.attr("islock"),
			$item = $main.find("div"),
			marginRig = parseInt($item.css("margin-right"),10),
			wid = $item.width() + marginRig,
			left = $main.position().left,
			len = $item.length,
			$iconActive = $(".index-topic").find(".right .list-item .active"),
			$iconList = $(".index-topic").find(".right .list-item div"),
			indexNum = $iconList.index($iconActive[0]);
			
		if(!~~isLock){//按钮锁
			return false;	
		}	
		$main.attr("islock","0");
		$iconActive.removeClass("active");
		if(left <= (-wid*(len-1))){//到头
			$iconList.eq(0).addClass("active");
			$main.stop().animate({"left":0+"px"},topicRight.animateTime,function(){
				$main.attr("islock","1");
			});
		}else{
			$iconList.eq(++indexNum).addClass("active");
			$main.stop().animate({"left":left-wid+"px"},topicRight.animateTime,function(){
				$main.attr("islock","1");
			});
		}
	});
	$(".index-topic").find(".right .list-item div").click(function(){
		var $main = $(".index-topic").find(".right .list-main"),
			isLock = $main.attr("islock"),
			$item = $main.find("div"),
			marginRig = parseInt($item.css("margin-right"),10),
			wid = $item.width() + marginRig,
			left = $main.position().left,
			len = $item.length,
			$iconActive = $(".index-topic").find(".right .list-item .active"),
			$iconList = $(".index-topic").find(".right .list-item div"),
			indexNum = $iconList.index($(this)[0]);
		
		if(!~~isLock){//按钮锁
			return false;	
		}
		if($(this).hasClass("active")){
			return false
		}
		$main.attr("islock","0");
		$iconActive.removeClass("active");
		$iconList.eq(indexNum).addClass("active");
		$main.stop().animate({"left":-wid*(indexNum)+"px"},topicRight.animateTime,function(){
			$main.attr("islock","1");
		});
	});
	function automaticTopic(){
		topicRight.timeOut = setTimeout(function(){
			if(topicRight.isMove){
				$(".index-topic").find(".right .btn-right").trigger("click");
				automaticTopic();
			}
		},topicRight.time);
	}
	automaticTopic();
	$(".index-topic").find(".right").hover(function(){
		clearTimeout(topicRight.timeOut);
		topicRight.isMove = false;
	},function(){
		topicRight.isMove = true;
		automaticTopic();
	});
	
	
	
	
	/*list-left*/
	$(".details-con").find(".left li>a").hover(function(){
		var $dom = $(this).nextAll("div"),
			$domParent = $(this).parent(),
			$li = $(".details-con").find(".left li").not($domParent),
			$notDom = $(".details-con").find(".left li>div").not($dom);
		
		$dom.css("display") === "none" ? ($dom.stop().slideDown(400,function(){
			$domParent.addClass("active");
		})) : "";
		$dom.css("display") === "block" ? ($notDom.stop().slideUp(400,function(){
			setTimeout(function(){
				$li.removeClass("active");
			},400);
		})) : "";
	},function(){});
});