/*
$('.collapse-more-icon').on('click',function (e) {
    $('.collapse-items').show();
})*/

// 1、搜索词
function _nl_ys_check(){

    var keyword = document.getElementById('showkeycode111260').value;
    if(keyword==null||keyword==""){
        alert("请输入你要检索的内容！");
        return false;
    }
    if(window.toFF==1)
    {
        document.getElementById("lucenenewssearchkeyword111260").value = Simplized(keyword );
    }else
    {
        document.getElementById("lucenenewssearchkeyword111260").value = keyword;
    }
    var  base64 = new Base64();
    document.getElementById("lucenenewssearchkeyword111260").value = base64.encode(document.getElementById("lucenenewssearchkeyword111260").value);
    new VsbFormFunc().disableAutoEnable(document.getElementById("showkeycode111260"));
    return true;
}
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

