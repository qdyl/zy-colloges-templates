// 1、鼠标悬停在“快捷菜单”
$('.quick-bar,.quick-menus').hover(function (e) {
    $('.quick-menus').show();
},function (e) {
    $('.quick-menus').hide();
});
// 2、鼠标点击“快捷菜单”
$('.quick-bar').on('click',function (e) {
    $('.quick-menus').toggle();
});
// 3、鼠标放在‘首页’、‘研院简介’...等导航上
$('.navbaritem').hover(function (e) {
    let index = $(this).index();
    $('.suspend-nav-item').eq(index).show().siblings('.suspend-nav-item').hide();
});
//
$('.suspend-nav-item').on('mouseleave ',function (e) {
    $('.suspend-nav-item').hide();
})
