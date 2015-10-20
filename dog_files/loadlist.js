function getJsonLength(jsonData){
  var jsonLength = 0;
  for(var item in jsonData){
    jsonLength++;
  }
  return jsonLength;
}
function loadlist()
{
  var pagetype = $("#currentstate").attr("channel_id");
  var pagesubject = $("#currentstate").attr("lst_id");
  $.ajax({
    type:"POST",
    url:"/exe/getList",
    dataType:"json",
    data:{channel_id:pagetype,lst_id:pagesubject},
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
            +unescape(obj.index[i].title)
            +'</h2></a>';
            $(".gallery").html(html);
          }else if(obj.index[i].mode=="150x120"){
            var html="";
            html='<li class="full"><div class="thumb"><a href="./page.jst?mid='
            +obj.index[i].page
            +'"><img src="./img_files/'
            +obj.index[i].pic
            +'.jpg"/> </div><h2>'
            +unescape(obj.index[i].title)
            +'</h2><p>'
            +unescape(obj.index[i].summary)
            +'</p><h3 class="meta">'
            +obj.index[i].auth
            +'<time>'
            +obj.index[i].time
            +'</time></h3></a></li>';
            $("#index").append(html);
          }else if(obj.index[i].mode=="640x140"){
            var html="";
            html='<li class="photo"><h2>'
            +unescape(obj.index[i].title)
            +'</h2><div class="thumb"><a href="./page.jst?mid='
            +obj.index[i].page
            +'"><img src="./img_files/'
            +obj.index[i].pic
            +'.jpg"/></div><p>'
            +unescape(obj.index[i].summary)
            +'</p></a></li>';
            $("#index").append(html);
          }else if(obj.index[i].mode=="html"){
            var html="";
            html='<li class="full"><div class="thumb"><a href="./templet_a.jst?mid='
            +obj.index[i].page
            +'"><img src="./img_files/'
            +obj.index[i].pic
            +'.jpg"/> </div><h2>'
            +unescape(obj.index[i].title)
            +'</h2><p>'
            +unescape(obj.index[i].summary)
            +'</p><h3 class="meta">'
            +obj.index[i].auth
            +'<time>'
            +obj.index[i].time
            +'</time></h3></a></li>';
            $("#index").append(html);
          }
         }
      }
      if(pagesubject=="0") total-=1;
      var currentsubject = parseInt(pagesubject) + total;
      $("#currentstate").attr("lst_id",currentsubject);
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
  $("#currentstate").attr("lst_id",0);
  loadlist();
}

$(document).ready(function(){
	var obj = document.getElementById("mynav").getElementsByTagName("li");
  var ch = $("#currentstate").attr("channel_id");
	obj[ch].className="on";

  loadlist();
});

