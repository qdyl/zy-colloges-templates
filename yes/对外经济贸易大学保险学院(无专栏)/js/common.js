
    $(function () {
        // 1、鼠标放置上去，添加红色背景
        $(".picBox").mouseover(function () {
            $(this).addClass("redbg");
        });
        $(".picBox").mouseout(function () {
            $(this).removeClass("redbg");
        });
    });
// 轮播：fade
$('.fade').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slide: 'div',
    cssEase: 'linear',
    autoplay:true,
    arrows:false
});

// 2、响应式折叠导航
let icon = document.getElementsByClassName('collapse-more-icon')[0];
let collapseitems = document.getElementsByClassName('collapse-items')[0];
let collapseitemswrap = document.getElementsByClassName('collapse-items-wrap')[0];
icon.addEventListener("click",function (e) {
    collapseitemswrap.style.display = 'block';
    collapseitems.classList.add('active');
});
collapseitemswrap.addEventListener('click',function (e) {
    collapseitemswrap.style.display = 'none';
    collapseitems.classList.remove('active');
});

