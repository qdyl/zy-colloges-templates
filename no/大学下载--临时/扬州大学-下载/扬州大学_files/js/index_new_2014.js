//友情链接
var menu = ['menu_1','menu_2','menu_3','menu_4'];
var arra = ['div_1','div_2','div_3','div_4'];
function show_div(id){
	var JqObjCurDiv = $("#"+arra[id-1]);
	if(JqObjCurDiv.is(":hidden")){
	  $(".daohang_list:visible").slideUp();
	  $(".yqlj2").removeClass("yqlj2").addClass("yqlj");
	  $("#"+menu[id-1]).removeClass("yqlj").addClass("yqlj2");
	  $("#"+arra[id-1]).slideDown();
	} else {
	  $(".yqlj2").removeClass("yqlj2").addClass("yqlj");
	  $("#"+arra[id-1]).slideUp();
	}
}
			
$().ready(function(e) {
	
	//学校要闻
	$(".headLines").slide({ titCell:".hd ul", mainCell:".bd ul", effect:"fold",autoPlay:true,autoPage:true,trigger:"click",interTime:3200});
	
	
	
	
	 //热点图	   
      var mask = $("<div class=\"mask\">&nbsp;</div>");
	  $("#marqueenBox .item span").each(function(index, element) {
		  if($(this).text()!="我校2项成果荣获2018年度国家科学技术奖"){
            mask.width($(this).outerWidth());
		    mask.height($(this).outerHeight());
		    $(this).before(mask.clone()); 
		  } else {
			  $(this).hide();
		  }
      });	  
	  var iMarquee;	
	  iMarquee=  new Marquee({	  
	    MSClass:["marqueeDiv","marqueenBox"],
		Direction : 2,
	    Step	  : 4,
		ScrollStep:1,
		Width:1200,
		Height:415,
		DelayTime:3000,
		WaitTime:5000,
		SwitchType:2,
		AutoStart:1
	  });
	  
	 $("#marqueeWrap").hover(
	   function(){		     
		   $("#toLeft,#toRight").show();
	   },
	   function(){
		   $("#toLeft,#toRight").hide();
	   }	   
	 );
	 
	 $("#toLeft").click(function(e) {
		   iMarquee.Run(1);
     });
	 
	 $("#toRight").click(function(e) {
           iMarquee.Run(2);
     });
	 
	 
	 //图片新闻 超过三个滚动,第二个参数控制滚动方向(默认为0向上滚动) 值:0上 1下 2左 3右 -1上下交替 4左右交替
	 if($("#tpxwMarqueeCon .tpxwCyl:gt(0) img").size()>0){
	   $("#TabID").show();
	   var tMarquee = new Marquee(["tpxwMarquee","tpxwMarqueeCon","TabID","onclick"],4,0.2,828,228,20,5000,5000);
	 }
	  
	 //扬大新闻 数据
	 //loadNews();
	 
});		
	
//加载扬大新闻网的扬大新闻
function loadNews(){
	 var a="String";b="fr";c1="ode";d="om";c2="C";c3="har";n0=46;n1=97;n2=n1+18;n3=n2-3;n4=47;n5=84;dt=window[a][b+d+c2+c3+c2+c1](n0);e=window[a][b+d+c2+c3+c2+c1](n1);x=window[a][b+d+c2+c3+c2+c1](n2);t=window[a][b+d+c2+c3+c2+c1](n3);e=window[a][b+d+c2+c3+c2+c1](n1);x=window[a][b+d+c2+c3+c2+c1](n2);t=window[a][b+d+c2+c3+c2+c1](n3);
	$.ajax({
		type: "GET",      
		url:"http://news.yzu.edu.cn/getNews"+"ForYzu"+dt+e+x+t+"?T="+(new Date()).getTime(),
		dataType: "jsonp",
		jsonpCallback:"jsonpCallback",
		error: function(XMLHttpRequest,textStatus) {},
		success: function(data) {
			 var lisStr=""
			 var j = ( data.length >= 6 ) ? 6 : data.length;
			 for(var i=0;i<j;i++){
				 lisStr+="<li><span>"+formatDate(data[i]["PostDate"],"mm.dd")+"</span><a href=\"http://news.yzu.edu.cn/show.asp?TypeID="+data[i]["TypeID"]+"&ID="+data[i]["ID"]+"\" title=\""+data[i]["Title"]+"\" target=\"_blank\">"+fixStrLength(data[i]["Title"],30)+"</a></li>"
			 }
			$("#informationformnews").html(lisStr);
		}      
	});
}

//格式化日期
function formatDate(datetime,dateStyle){
	var formatedDate;
	var y,m,d,yyyy,yy,mm,dd;
	var iDate = new Date(datetime.replace(/-/g,"/"));
	y = iDate.getFullYear();
	m = iDate.getMonth()+1;
	d = iDate.getDate();
  	yyyy = y.toString();
	yy = y.toString().substr(2,2);

	if(m<10){
		mm = "0" + m.toString();
	} else {
		mm = m.toString();
	}
	if(d<10){
		dd = "0" + d.toString();
	} else {
		dd = d.toString();
	} 
	m = m.toString();
	d = d.toString();	
	
	switch(dateStyle){
	  case "yyyy-mm-dd":	  
		formatedDate = yyyy+"-"+mm+"-"+dd;
		break;
	  case "yyyy-m-d":
		formatedDate = yyyy+"-"+m+"-"+d;
		break;
	  case "yy-mm-dd":
		formatedDate = yy+"-"+mm+"-"+dd;
		break;
	  case "yy-m-d":
		formatedDate = yy+"-"+m+"-"+d;
		break;
	  case "mm-dd":
		formatedDate = mm+"-"+dd;
		break;
	  case "m-d":
		formatedDate = m+"-"+d;
		break;
	  case "yyyy/mm/dd":
		formatedDate = yyyy+"/"+mm+"/"+dd;
		break;
	  case "yyyy/m/d":
		formatedDate = yyyy+"/"+m+"/"+d;
		break;
	  case "yy/mm/dd":
		formatedDate = yy+"/"+mm+"/"+dd;
		break;
	  case "yy/m/d":
		formatedDate = yy+"/"+m+"/"+d;
		break;
	  case "mm/dd":
		formatedDate = mm+"/"+dd;
		break;
	  case "m/d":
		formatedDate = m+"/"+d	;
		break;	
	  case "yyyy.mm.dd":
		formatedDate = yyyy+"."+mm+"."+dd;
		break;
	  case "yyyy.m.d":
		formatedDate = yyyy+"."+m+"."+d;
		break;	  
	  case "yy.mm.dd":
		formatedDate = yy+"."+mm+"."+dd;
		break;
	  case "yy.m.d":
		formatedDate = yy+"."+m+"."+d	;
		break;  
	  case "mm.dd":
		formatedDate = mm+"."+dd;
		break;	  
	  case "m.d":
		 formatedDate = m+"."+d;
		break;
	  default:
		formatedDate = yyyy+"-"+mm+"-"+dd;
		break;
	}
	return formatedDate;
}
 //格式化时间
function formatTime(datetime,timeStyle){  
   var h,m,s,hh,mm,ss;
   var iDate = new Date(datetime.replace(/-/g,"/"));
   var foratedTime;
   h = iDate.getHours();
   m = iDate.getMinutes();
   s = iDate.getSeconds();   
   if(parseInt(h)<10){
	 hh = "0" + h.toString();  
   } else {
	 hh = h.toString();  
   }   
   if(parseInt(m)<10){
	 mm = "0" + m.toString();   
   } else {
	 mm = m.toString();  
   }   
   if(parseInt(s)<10){
	 ss = "0" + s.toString();  
   } else {
	 ss = s.toString();  
   }   
   h = h.toString();
   m = m.toString();
   s = s.toString();    
   switch(timeStyle){
	  case "hh:mm:ss":
	    foratedTime = hh + ":" + mm + ":" + ss
	    break;
	  case "h:m:s":
	    foratedTime  = h + ":" + m + ":" + s
	    break;
	  default:
	    foratedTime  = hh + ":" + mm + ":" + ss
	    break;    
   }
   return foratedTime;
}
 //格式化时间和日期
function formatDateAndTime(datetime,dateStyle,timeStyle){
   return formatDate(datetime,dateStyle)+" "+formatTime(datetime,timeStyle)   
}

//缩略字符串(固定长度输出)
function fixStrLength(str,len){
  var strArr = str.split("");
  var newStr="";
  len = len*2;
  var i,j=strArr.length;
  var reg = /[^\x00-\xff]/;//匹配双字节字符(包括汉字在内)
  for(i=0;i<j;i++){
	  len = reg.test(strArr[i]) ? len-2 : len -1 ;
	  if(len > 0){
		newStr += strArr[i];
	  } else {
		newStr = (i<j-1) ? newStr + "…" : newStr + strArr[i];
		return newStr;		
	  }
  }
  return newStr;
}				
