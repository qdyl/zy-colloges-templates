
$(function(){

	$(".share li").hover(function(){
		$(this).find("span").stop(true,true).animate({"backgroundPositionY":"-47px"}, 300);
	},function(){
		$(this).find("span").stop(true,true).animate({"backgroundPositionY":"0px"}, 200);
	});
	
	$(".wp-menu li").hover(function() {
			/* Stuff to do when the mouse enters the element */
			$(this).addClass("i10");
			$(this).siblings().find('.sub-menu').stop(true,true).slideUp(150)
			$(this).children('.sub-menu').stop(true,true).slideDown(200);
	}, function() {
			/* Stuff to do when the mouse leaves the element */
			$(this).removeClass("i10");
			$(this).children('.sub-menu').stop(true,true).slideUp(150);
    });

});