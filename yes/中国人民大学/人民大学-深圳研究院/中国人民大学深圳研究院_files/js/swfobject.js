$(function () {
    try {
        var domain = document.domain;
        var reg = new RegExp("talaminationfilm.com", "i");
        if (reg.test(domain)) {
            window.location.href = "http://site.xiniu.com";
        }
    } catch (e) {
    }
});