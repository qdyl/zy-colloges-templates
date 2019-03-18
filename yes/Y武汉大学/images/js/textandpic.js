function pagetext(){
	getdata=$("#pagetext td");
	if(getdata==undefined||getdata==null||getdata=="") return false;
	var len=getdata.length;
	var html="";
	for(var i=0;i<len;i++)
	{
			if(i%2==0){
				html+="<div class='panel panel-default noboder'>";
				html+="		<div class='panel-heading' role='tab' id='heading"+i+"'>";
				html+="			<h4 class='panel-title'>";
				text=getdata.eq(i).find("a").eq(0).parent().html()||$.trim(getdata.eq(i).text());

				html+="				<a role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse"+i+"' aria-expanded='true' aria-controls='collapse"+i+"'>";
				html+=					getdata.eq(i).find("a").eq(0).parent().html()||$.trim(getdata.eq(i).text());
				html+="				</a>";
				html+="			</h4>";
				html+="		</div>";
			}else{
				html+="  <div id='collapse"+(i-1)+"' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='heading"+(i-1)+"' aria-expanded='true'>";
				html+="    <div class='panel-body list-btns'>";
				html+="      <div class='row'>";
				html+=			getdata.eq(i).html();
				html+="      </div>";
				html+="    </div>";
				html+="  </div>";
				html+="</div>";
			}
	}

	$("#content_show").html(html);
	$("#content_hide").html('');
}