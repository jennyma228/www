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
            +'" class="galleryinner"><img src="./img_files/'
            +obj.index[i].pic
            +'.jpg" /> </a></div><h2 class="gallerytitle">'
            +obj.index[i].title
            +'</h2>';
            $(".galleryimage").prepend(html);
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
  switch(ch){
    case 1:
      $("#ch1").attr("class","on");
      $("#ch2").attr("class","off");
      $("#ch3").attr("class","off");
      $("#ch4").attr("class","off");
      $("#currentstate").attr("channel_id","1");
      //alert("ch11");
      break;
    case 2:
      $("#ch1").attr("class","off");
      $("#ch2").attr("class","on");
      $("#ch3").attr("class","off");
      $("#ch4").attr("class","off");
      $("#currentstate").attr("channel_id","2");
      //alert("ch21");
      break;
    case 3:
      $("#ch1").attr("class","off");
      $("#ch2").attr("class","off");
      $("#ch3").attr("class","on");
      $("#ch4").attr("class","off");
      $("#currentstate").attr("channel_id","3");
      //alert("ch31");
      break;
    case 4:
      $("#ch1").attr("class","off");
      $("#ch2").attr("class","off");
      $("#ch3").attr("class","off");
      $("#ch4").attr("class","on");
      $("#currentstate").attr("channel_id","4");
      //alert("ch41");
      break;
  }
  loadlist();
}

$(document).ready(function(){
  switchchannel(1);
  //alert("hello1");
});



