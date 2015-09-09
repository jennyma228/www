function getJsonLength(jsonData){
  var jsonLength = 0;
  for(var item in jsonData){
    jsonLength++;
  }
  return jsonLength;
}
function loadlist()
{
  $.ajax({
    type:"POST",
    url:"/exe/getList",
    dataType:"json",
    data:{channel_id:$("#currentstate").attr("channel_id"),lst_id:$("#currentstate").attr("lst_id")},
    success:function(data){
      var obj = eval(data);
      var total=getJsonLength(obj.index);
      var list="";
      $("#index").empty();
      if(total>0){
        for(var i=0;i<total;i++) {
          //list+='time='+obj.index[i].time
          //+' pic='+obj.index[i].pic
          //+' page='+obj.index[i].page
          //+' auth='+obj.index[i].auth
          //+' title='+obj.index[i].title
          //+' text='+obj.index[i].text
          //+' mode='+obj.index[i].mode
          //+'\n';

          if(obj.index[i].mode=="640x330"){
            var html="";
            html='<a href="./page.jst?mid='
            +obj.index[i].page
            +'" class="galleryinner"><div class="galleryimage"><img src="./img_files/'
            +obj.index[i].pic
            +'.jpg" /> </div><h2 class="gallerytitle">'
            +obj.index[i].title
            +'</h2></a>';
            $(".gallery").html(html);
          }else if(obj.index[i].mode=="150x120"){
            var html="";
            html='<li class="full"><div class="thumb"><a href="./page.jst?mid='
            +obj.index[i].page
            +'"><img src="./img_files/'
            +obj.index[i].pic
            +'.jpg"/> </div><h2>'
            +obj.index[i].title
            +'</h2><p>'
            +obj.index[i].text
            +'</p><h3 class="meta">'
            +obj.index[i].auth
            +'<time>'
            +obj.index[i].time
            +'</time></h3></a></li>';
            $("#index").append(html);
          }else if(obj.index[i].mode=="640x140"){
            var html="";
            html='<li class="photo"><h2>'
            +obj.index[i].title
            +'</h2><div class="thumb"><a href="./page.jst?mid='
            +obj.index[i].page
            +'"><img src="./img_files/'
            +obj.index[i].pic
            +'.jpg"/></div><p>'
            +obj.index[i].text
            +'</p></a></li>';
            $("#index").append(html);
          }
         }
      }
      //alert(list);
    },
    complete:function(XMLHttpRequest,textStatus){
     },
    error:function(e){
    }
  })
}

function switchchannel(ch)
{
  $("#currentstate").attr("channel_id",ch);
  loadlist();
}

$(document).ready(function(){
	var obj = document.getElementById("mynav").getElementsByTagName("li");
  var ch = $("#currentstate").attr("channel_id");
	obj[ch].className="on";

  loadlist();
});

