// 1、切换‘媒体活动’、‘学术活动’、‘信息公共’
$('.mobile-tab').on('click',function (e) {
    let index = $(this).index();
    $(this).addClass('active').siblings('.mobile-tab').removeClass('active');
    $(".two-main>div").eq(index).show().siblings('div').hide();
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
// 3、轮播图1
$(function(){
    $('.slick-one').slick({
        dots: false,
        autoplay:true
    });
});
// 4、轮播图2
$(function(){
    $('.slick-two').slick({
        dots: true,
        autoplay:true,
        arrows:false
    });
});

