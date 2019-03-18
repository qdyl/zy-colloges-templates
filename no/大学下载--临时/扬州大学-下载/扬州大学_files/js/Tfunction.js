//随意漂浮层
//divID为漂浮层的ID，xpos,ypos 是起点左上角的座标
function divFloat(divID,xpos,ypos,showClose){
	var floatDiv;
	if (typeof divID =="object"){
	   floatDiv = divID ;
	} else {
	   floatDiv =  document.getElementById(divID);
	}
	//设置漂浮
	var x,y;
	var itl;
	x = xpos ? xpos : 50;
	y = ypos ? ypos : 60;
	var xin = true, yin = true;
	var step = 1;
	var delay = 30;
	var obj=document.getElementById(divID);
	function floatAD() {
		if(floatDiv.style.display=="none" && typeof itl !=="undefined"){
		  clearInterval(itl);
		}		
		var cWidth = document.documentElement.scrollWidth || document.body.clientWidth;
		var cHeight = document.documentElement.scrollHeight || document.body.clientHeight;
		
		var R= cWidth - obj.offsetWidth;
		var B = cHeight - obj.offsetHeight;
		obj.style.left = x +"px";
		obj.style.top = y +"px";
		x = x + step*(xin?1:-1);
		if (x <= 0) { xin = true; x = 0;}
		if (x > R){ xin = false; x = R;}
		y = y + step*(yin?1:-1)
		if (y <= 0) { yin = true; y = 0 ;}
		if (y > B) { yin = false; y = B ;}
	}
	if(floatDiv.style.display!="none"){
	  itl= setInterval(floatAD, delay);
	}
	//动态切换
	var aLinks = floatDiv.getElementsByTagName("A");	
	var k = 0 ;
	var j=aLinks.length;
	if((aLinks.length)<1){
		return false;//没有可显示的A元素
	}
	
	var st;
	var hasSingleALinkShow=false;
	for(var P=0;P<j;P++){
		if(aLinks[P].style.display!="none"){
			if(hasSingleALinkShow!=true){
			   hasSingleALinkShow = true;
			} else {
			  aLinks[P].style.display ="none";
			}
		}
	}
	if(!hasSingleALinkShow){
		aLinks[0].style.display = "";
	}
	var showimg = function(){
		if(floatDiv.style.display=="none"){
		  return false;
		}		
		for(var i=0;i<j;i++)
		{
			aLinks[i].style.display="none";		
		}
		aLinks[k].style.display = "block";		
		k = ++k % j;
		st=setTimeout(showimg , 3000);
	}
	if(j>1 && floatDiv.style.display!="none"){st=setTimeout(showimg , 3000);}
	
	//增加关闭按钮
	if(!(typeof showClose !=="undefined" &&  showClose===false)){	
		var closeDiv = document.createElement("div");
		closeDiv.style.textAlign="right";
		closeDiv.style.paddingTop="5px";
		closeDiv.style.fontSize="12px";
		var closeDivALink = document.createElement("a");
		closeDivALink.setAttribute("href","javascript:void(0)");
		closeDivALink.style.textDecoration="none";
		closeDivALink.style.color="#666666"
		//closeDivALink.setAttribute("style","right:0;");
		closeDivALink.onclick=function(){
		   floatDiv.style.display='none';
		}
		var textnode = document.createTextNode("关闭");
		closeDivALink.appendChild(textnode);
		closeDiv.appendChild(closeDivALink);
		obj.appendChild(closeDiv);
	}	
	//mousever 事件
	obj.onmouseover=function(){clearInterval(itl);clearTimeout(st)};
	obj.onmouseout=function(){itl=setInterval(floatAD, delay);st=setTimeout(showimg , 3000);};
}
