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
    
      if(total>0){
        for(var i=0;i<total;i++) {
          list+='time='+obj.index[i].time
          +' pic='+obj.index[i].pic
          +' auth='+obj.index[i].auth
          +' title='+obj.index[i].title
          +' text='+obj.index[i].text
          +' mode='+obj.index[i].mode
          +'<br/>';
         }
      }
      alert(list);
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



