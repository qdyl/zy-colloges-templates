// JavaScript Document

var multimenu={
  disappeardelay: 600,          //菜单消失等待时间
  arrTimeout:new Array(),       //存储setTimeout数组
  mainMenuID:null,
   
  //显示二级子菜单
  dropMenu:function(objMainMenuLink,dropmenu){
	    $("#"+multimenu.mainMenuID).find(".mainMenu_a_cur").removeClass("mainMenu_a_cur");
	    $(objMainMenuLink).addClass("mainMenu_a_cur");
	    var offset=$(objMainMenuLink).offset();
	    dropmenu[0].style.left=(offset.left-1)+"px";
		var t=offset.top+objMainMenuLink.offsetHeight;
		dropmenu[0].style.top=t.toString()+"px";
		dropmenu.find("a.dropMenu_a_cur").removeClass("dropMenu_a_cur");
	    dropmenu.slideDown(100);	
	    
  },
  //显示三级及以下的菜单
  popMenu:function(obj_a,popmenu){
	    var Offset=$(obj_a).offset();
	    var _left=(Offset.left+obj_a.offsetWidth).toString()+"px";
	    var _top=Offset.top.toString()+"px"; 
		popmenu.css({"left":_left,"top":_top});
		//popmenu[0].style.left=_left;
		//popmenu[0].style.top=_top;
		popmenu.find("a.popMenu_a_cur").removeClass("popMenu_a_cur");
		popmenu.show();
  }, 
  
  delayHideMenu:function(menuDiv){
	  var i=parseInt(menuDiv.attr("number"));
	  this.arrTimeout[i]=setTimeout(function(){
			  menuDiv.slideUp(100);
			  menuDiv.removeAttr("number");
			  $("#"+multimenu.mainMenuID).find(".mainMenu_a_cur").removeClass("mainMenu_a_cur");
	 },this.disappeardelay) //hide menu
  },
  clearHideMenu:function(i){
	    clearTimeout(this.arrTimeout[i]);
  },
  
  //设置鼠标移动到菜项目上的样式 或者 有子项打开的菜单项目的样式
  setCurrent_a_style:function(objA){
     var dropmenuA=$(objA).closest("div.dropMenu"); //查找是不是dropMenu(下拉的DIV)
	 if(dropmenuA.size()==1) //是dropMenu 
	 {
		 dropmenuA.find("a.dropMenu_a_cur").removeClass("dropMenu_a_cur");
		 $(objA).addClass("dropMenu_a_cur");
	 }
	 else  //不是dropMenu
	 {
		 var popmenuA=$(objA).closest("div.popMenu");
		 if(popmenuA.size()==1)
		 {
			 popmenuA.find("a.popMenu_a_cur").removeClass("popMenu_a_cur");
			 $(objA).addClass("popMenu_a_cur");
		 }
	 }
  },  

  init:function(ID){
	//初始化下拉菜单
	multimenu.mainMenuID = ID;
	var mainMenu_a=$("#"+ID.toString());
	//下面加not 防止 当前放主菜单的ID,包含了子菜单
	mainMenu_a.find("[rel]").not(".dropMenu a[rel],.popMenu a[rel]").each(function(index, element) {
		          var thisMainMenuLink=this;
	              var thisRel=$.trim($(this).attr("rel"));
				  var curDropMenu=$("#"+thisRel.toString());				  
                  $(this).hover(function(){					            
								   var len=multimenu.arrTimeout.length;
								   if(len>0)
								   {
									   for(var j=0;j<len;j++)
									   {
										  if(multimenu.arrTimeout[j]!=null)
										  {
										   multimenu.clearHideMenu(j); 
										  }
									   }
								   }
								   if (curDropMenu.is(":hidden")){
									   multimenu.arrTimeout=[];
									   //加一个层的序号,方便关闭
									   curDropMenu.attr("number",0);								 
									   $(".dropMenu,.popMenu").hide();
									   multimenu.dropMenu(thisMainMenuLink,curDropMenu);	
								   } else {
									    curDropMenu.find("a.dropMenu_a_cur").removeClass("dropMenu_a_cur");
										$(".popMenu").hide();
								   }
					            },
	                            function(){
					               multimenu.delayHideMenu(curDropMenu);					  
					            });
								
				 curDropMenu.hover(function(){
					              multimenu.clearHideMenu(0); 
				                },
								function(){
								  multimenu.delayHideMenu(curDropMenu);	
								});	
    });
	
	//主菜单要其它 无下拉链接a mouseover时 关闭下拉菜单
	mainMenu_a.find("a").not("[rel],.dropMenu a,.popMenu a").mouseover(function(e) {
		var len=multimenu.arrTimeout.length;
	    if(len>0)
	    {
		   for(var j=0;j<len;j++)
		   {
			  if(multimenu.arrTimeout[j]!=null)
			  {
			   multimenu.clearHideMenu(j); 
			  }
		   }
	    }
        $(".dropMenu,.popMenu").hide(); 
		$("#"+multimenu.mainMenuID).find(".mainMenu_a_cur").removeClass("mainMenu_a_cur");
    });
	
	//初始化弹出菜单
    $(".dropMenu a[rel],.popMenu a[rel]").each(function(index, element) {
        $(this).addClass("hasPopMenu_a");	
    });
	
	$(".dropMenu a,.popMenu a").each(function(index, element) {
		
		var alink=this;
		var relValue=$.trim($(this).attr("rel"));
		if(	relValue!="" && relValue!=null)
		{	
			var curPopMenu=$("#"+relValue.toString());
			$(this).hover(function(){
				             multimenu.setCurrent_a_style(this);
				           	 var number=parseInt($(this).closest("div").attr("number"))+1;
							 var oDiv=$("div.popMenu[number]").filter(function(index) {
                                    var n=parseInt($(this).attr("number"));
								    return n>=number;
                                  });
							 if(oDiv.size()>0)
							 {						
								 oDiv.hide();
								 oDiv.each(function(index, element) {
                                    var k=$(this).attr("number");
									multimenu.clearHideMenu(k); //防止重复关闭 可加可不加 
                                });
								oDiv.removeAttr("number");
							 }
							 curPopMenu.attr("number",number);
							 multimenu.popMenu(alink,curPopMenu);
						   },
						   function(){
							  multimenu.delayHideMenu(curPopMenu); 
						   });
		   curPopMenu.hover(function(){
			                      var number=parseInt($(this).closest("div").attr("number"));
								  for(var i=0;i<=number;i++)
								  {
                                     multimenu.clearHideMenu(i); 
								  }
				                },
								function(){
									var number=parseInt($(this).closest("div").attr("number"));
									for(var i=0;i<=number;i++)
								    {
									  var oDiv=$("div[number="+i.toString()+"]");
									  multimenu.delayHideMenu(oDiv);
								    }
								});
		}
		else
		{
			$(this).mouseover(function(){
				 multimenu.setCurrent_a_style(this);
				 var number=parseInt($(this).closest("div").attr("number"))+1;
							 var oDiv=$("div.popMenu[number]").filter(function(index) {
                                              var n=parseInt($(this).attr("number"));
								              return n>=number;
                                        });
							 if(oDiv.size()>0)
							 {					
								 oDiv.hide();
								 oDiv.each(function(index, element) {
                                    var k=$(this).attr("number");
									multimenu.clearHideMenu(k); //防止重复关闭 可加可不加 
                                 });
								 oDiv.removeAttr("number");
							 }
				});
		}
		
		
    });
					
  }//init 结束 
  
}//全部结束

$().ready(function(e) {
	if($("#trmenu").size()>0)
	{
		multimenu.init("trmenu");
	}
});