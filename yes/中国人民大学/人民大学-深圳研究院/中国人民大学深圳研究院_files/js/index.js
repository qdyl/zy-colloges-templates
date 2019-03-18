/*public*/

/*public*/
/*ea_h*/
/*ea_h*/
/*ea_ba*/
/*xn_ba_js_13_banner*/
var xn_ba_js_13_autoPlay = true;
var xn_ba_js_13_interval = 6000;
var bannerW = "100%";
var xn_ba_js_13_nextfunc;
var xn_ba_js_13_timer;
$(document).ready(function () {
    if ($("#xn_ba_js_13_banner").length>0) {
        xn_ba_js_13_start();
    };
});
var xn_ba_js_13_start = function () {
    var maxLen = 0;
    var index = 0;
    var prev = -1;
    var imgW, imgH, sizeW, sizeH = 0;
    var running = false;
    maxLen = $(".xn_ba_js_13_element").length;
    imgW = $(".xn_ba_js_13_bigImg").find("img").eq(0).width();
    imgH = $(".xn_ba_js_13_bigImg").find("img").eq(0).height();
    for (var i = 0; i < $(".xn_ba_js_13_element").length; i++) {
        var ele = $(".xn_ba_js_13_element").eq(i).find("img");
        ele.attr("src", ele.attr("data-original"));
    }
    var btnData = "";
    for (var i = 0; i < maxLen; i++) btnData += '<li class="xn_ba_js_13_element_btn">';
    $(".xn_ba_js_13_btn").html(btnData);
    var btn = $(".xn_ba_js_13_btn").find("li").eq(0);
    var btnW = btn.width() + Math.round(btn.css("margin-left").replace(/[a-zA-Z]/g, ""));
    $(".xn_ba_js_13_btn").css("width", maxLen * btnW);
    btn.attr("class", "xn_ba_js_13_element_btn_on");
    $(".xn_ba_js_13_banner").css("visibility", "visible");
    for (var i = 0; i < maxLen; i++) {
        $(".xn_ba_js_13_element").eq(i).attr("id", "ea_ba_no_b_" + i);
        var _pos = Math.round(imgW * (i - index) + sizeW / 2 - imgW / 2);
        if (i == index) _opa = 1;
        if (_pos > sizeW) {
            _pos -= maxLen * imgW
        } else if (_pos < -imgW) {
            _pos += maxLen * imgW
        }
        $(".xn_ba_js_13_element").eq(i).css({
            left: _pos,
            opacity: 0
        }).animate({
            opacity: _opa
        }, {
            duration: 400,
            easing: 'linear'
        })
    }
    onResize();
    $(window).resize(onResize);
    function onResize() {
        for (var i = 0; i < maxLen; i++) {
            if (bannerW == "100%") {
                sizeW = $(window).width();
            } else {
                sizeW = parseInt(bannerW);
            }
            var _pos = Math.round(imgW * (i - index) + sizeW / 2 - imgW / 2);
            var _opa = 1;
            if (i == index) _opa = 1;
            if (_pos > sizeW) {
                _pos -= maxLen * imgW
            }
            $(".xn_ba_js_13_element").eq(i).stop().css({
                left: _pos,
                opacity: _opa
            })
        }
    };
    $(".xn_ba_js_13_btn li").each(function (i) {
        $(this).click(function () {clearInterval(xn_ba_js_13_timer);
            skipHandler((i));
        });
    });
    $("#xn_ba_js_13_prev").hover(function(){
        clearInterval(xn_ba_js_13_timer);
    },function(){
        xn_ba_js_13_timer = setInterval(xn_ba_js_13_nextfunc, xn_ba_js_13_interval);
    });
    //左右切换
    $("#xn_ba_js_13_prev").click(function(){
        var cur = index;
        cur++;
        if (cur > maxLen - 1) cur = 0;
        skipHandler(cur);
    });
    $("#xn_ba_js_13_next").click(function(){
        var cur = index;
        cur--;
        if (cur < 0) cur = maxLen - 1;
        skipHandler(cur);
    });
    timerRepeat();
    function skipHandler(target) {
        if (target == index) return;
        var d = 1;
        var pure = index;
        if (target < pure) d = -1;
        var btn = $(".xn_ba_js_13_btn").find("li");
        btn.eq(pure).attr("class", "xn_ba_js_13_element_btn");
        btn.eq(target).attr("class", "xn_ba_js_13_element_btn_on");
        var len;
        if (d == 1) {
            len = target - pure;
            if (len <= 1) {
                index = target;
                nextPage();
            } else {
                for (var k = pure; k <= target; k++) {
                    index = k;
                    nextPage();
                }
            }
        } else {
            len = index - target;
            if (len <= 1) {
                index = target;
                prevPage();
            } else {
                for (var k = index; k >= target; k--) {
                    index = k;
                    prevPage();
                }
            }
        }
    }
    function timerRepeat() {
        if (!xn_ba_js_13_autoPlay) return;
        xn_ba_js_13_nextfunc = isPause;
        xn_ba_js_13_timer = setInterval(xn_ba_js_13_nextfunc, xn_ba_js_13_interval);
    }
    function isPause() {
        var isRun = true;
        if (typeof parent.runonce != 'undefined') {
            isRun = parent.runonce;
        }
        if (isRun) {
            var cur = index;
            cur++;
            if (cur > maxLen - 1) cur = 0;
            skipHandler(cur);
            return false;
        } else {
            return true;
        }
    }
    function nextPage() {
        if (xn_ba_js_13_timer) {
            clearInterval(xn_ba_js_13_timer);
            timerRepeat();
        }
        if ($(window.parent.bannerparam).length > 0) {
            window.parent.bannerparam.cur_ba_index = index;
        }
        _pict = $(".xn_ba_js_13_element");
        for (var i = 0; i < maxLen; i++) {
            var _pos = Math.round(imgW * (i - index) + sizeW / 2 - imgW / 2);
            var _opa = 1;
            if (i == index) _opa = 1;
            if (_pos > sizeW) {
                _pos -= maxLen * imgW
            } else if (_pos < -imgW * 2) {
                _pos += maxLen * imgW
            }
            _pict.eq(i).stop().css({
                left: _pos + imgW
            }).animate({
                left: _pos,
                opacity: _opa
            }, {
                duration: 700,
                easing: 'easeOutQuint'
            })
        }
    }
    function prevPage() {
        if (xn_ba_js_13_timer) {
            clearInterval(xn_ba_js_13_timer);
            timerRepeat();
        }
        if ($(window.parent.bannerparam).length > 0) {
            window.parent.bannerparam.cur_ba_index = index;
        }
        for (var i = 0; i < maxLen; i++) {
            var _pos = Math.round(imgW * (i - index) + sizeW / 2 - imgW / 2);
            if (_pos < -imgW) {
                _pos += maxLen * imgW
            } else if (_pos > sizeW + imgW) {
                _pos -= maxLen * imgW
            }
            $(".xn_ba_js_13_element").eq(i).stop().css({
                left: _pos - imgW
            }).animate({
                left: _pos
            }, {
                duration: 700,
                easing: 'easeOutQuint'
            })
        }
    }
}
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuint',
    swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    }, easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    }
});
/*end_xn_ba_js_13_banner*/
/*ea_ba*/
/*ea_c*/
/*i_video*/
/*end_i_video*/
/*xn_c_index_138_wrap*/
$(function(){
	$(".xn_c_index_138_typeName").first().addClass("xn_c_index_138_typeName_cur");
	$(".xn_c_index_138_contType").first().addClass("xn_c_index_138_contType_cur");
	$(".xn_c_index_138_typeName").hover(function(){
		$(this).addClass("xn_c_index_138_typeName_cur");
		$(this).next(".xn_c_index_138_contType").addClass("xn_c_index_138_contType_cur");
		$(this).parent().siblings().children(".xn_c_index_138_typeName").removeClass("xn_c_index_138_typeName_cur");
		$(this).parent().siblings().children(".xn_c_index_138_contType").removeClass("xn_c_index_138_contType_cur");
	});
});
/*end_xn_c_index_138_wrap*/
/*xn_c_index_2361_wrap*/
$(function(){
        $(".xn_c_index_2361_typeName").first().addClass("xn_c_index_2361_typeName_cur");
        $(".xn_c_index_2361_contType").first().addClass("xn_c_index_2361_contType_cur");
        $(".xn_c_index_2361_typeName").hover(function(){
            $(this).addClass("xn_c_index_2361_typeName_cur");
            $(this).next(".xn_c_index_2361_contType").addClass("xn_c_index_2361_contType_cur");
            $(this).parent().siblings().children(".xn_c_index_2361_typeName").removeClass("xn_c_index_2361_typeName_cur");
            $(this).parent().siblings().children(".xn_c_index_2361_contType").removeClass("xn_c_index_2361_contType_cur");
        });
    });
/*end_xn_c_index_2361_wrap*/
/*xn_c_index_630_wrap*/
$(function(){
    /*首页推荐新闻上下滚动*/
    if($("#xn_c_index_630_nrbox").length > 0){
        var $wrap = $("#xn_c_index_630_nrbox");
        var $main = $("#xn_c_index_630_main");
        var $ul = $("#xn_c_index_630_ul");
        var $li = $ul.children();
        var colum = 10;              //设置显示个数
        var speed = 1000;           //滚动速度
        var intervalTime = 3000;    //间隔时间
        $main.css("height",$li.outerHeight(true)*colum);
        function scrollTop(){
            $ul.stop().animate({top:"-"+$li.outerHeight(true) +"px"},speed,function(){
                $ul.append($ul.children().first());
                $ul.css("top",0);
            }); 
        }           
        var autoPlay = setInterval(scrollTop,intervalTime);
        $wrap.hover(function(){
            clearInterval(autoPlay);
        },function(){
            autoPlay = setInterval(scrollTop,intervalTime);
        });
    }
});
/*end_xn_c_index_630_wrap*/
/*xn_c_index_308_wrap*/
$(function(){
if ($("#xn_c_index_308_wrap").length>0) {
    var oIsNew=$("#xn_c_index_308_fisnew");
    var oIsHot=$("#xn_c_index_308_fishome");
    var oTopUl=$("#xn_c_index_308_tul");
    var oFbox=$("#xn_c_index_308_fbox");
    var oCurr="xn_c_index_308_tlicurr";
    //布局转换 添加不同的class
    oIsNew.children().each(function(){
        $(this).addClass("xn_c_index_308_fisli"+$(this).index());
    })
    oIsHot.children().each(function(){
        $(this).addClass("xn_c_index_308_fisli"+$(this).index());
    })
    oIsNew.show();
    oIsHot.hide();
    //选项卡功能
    oTopUl.children("li").hover(function(){
        $(this).addClass(oCurr).siblings().removeClass(oCurr);
        oFbox.children().eq($(this).index()).show().siblings().hide();
    })
};
})
/*end_xn_c_index_308_wrap*/
/*xn_c_index_236_wrap*/
$(function(){
        for(var i = 0;i < $(".xn_c_index_236_img").length; i++){
            if (i == 0 || i==3) {
                $($('.xn_c_index_236_img')[i]).css("display","block");
            };
        };
        $(".xn_c_index_236_typeName").first().addClass("xn_c_index_236_typeName_cur");
        $(".xn_c_index_236_contType").first().addClass("xn_c_index_236_contType_cur");
        $(".xn_c_index_236_typeName").hover(function(){
            $(this).addClass("xn_c_index_236_typeName_cur");
            $(this).next(".xn_c_index_236_contType").addClass("xn_c_index_236_contType_cur");
            $(this).parent().siblings().children(".xn_c_index_236_typeName").removeClass("xn_c_index_236_typeName_cur");
            $(this).parent().siblings().children(".xn_c_index_236_contType").removeClass("xn_c_index_236_contType_cur");
        });
    });
/*end_xn_c_index_236_wrap*/
/*ea_c*/
/*ea_b*/
/*xn_f_13_wrap*/
jQuery(function(){
//图库弹出层
$(".xn_f_13_mskeLayBg").height($(document).height());
$(".xn_f_13_mskeClaose").click(function(){$(".xn_f_13_mskeLayBg,.xn_f_13_mskelayBox").hide()});
$(".xn_f_13_msKeimgBox li").click(function(){$(".xn_f_13_mske_html").html($(this).find(".xn_f_13_hidden").html());
$(".xn_f_13_mskeLayBg").show();$(".xn_f_13_mskelayBox").fadeIn(300)});
$(".xn_f_13_mskeTogBtn").click(function(){$(".xn_f_13_msKeimgBox").toggleClass("xn_f_13_msKeimgBox2");
$(this).toggleClass("xn_f_13_mskeTogBtn2")});
})
/*end_xn_f_13_wrap*/
/*ea_b*/
/*ea_bg*/
/*ea_bg*/
/*ea_m*/
/*ea_m*/
/*ea_pi*/
/*ea_pi*/

/*ea_wj*/
/*ea_wj*/