var isread = 0;
var barrierfreewebid = 100;
var readType = 'a,p';
$(function(){
	 var pathname = window.location.pathname;

	 if(pathname.indexOf('/preview.do')!=-1||pathname.indexOf('/preview_show.do')!=-1||pathname.indexOf('/view/')!=-1){
		path1 = "/web100/site/module/jslib/accessiblereading/js/barrierfree.js";
	 }else{
	   path1 = '/module/jslib/accessiblereading/js/barrierfree.js';
	 }

	 $.getScript(path1);
});