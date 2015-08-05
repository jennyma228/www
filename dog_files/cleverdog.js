function uploadTxt(page)
{
  var haha=document.getElementById("pagetext").value;
      alert(haha);
  haha=((haha.replace(/<(.+?)>/gi,"&lt;$1&gt;")).replace(/ /gi,"&nbsp;")).replace(/\n/g,"<br/>");
      alert(haha);
  document.getElementById("pagetext").value=haha;

  var formParam = $("#formpageText").serialize(); 
  $.ajax({
     type:"POST",
     url:"/action/uploadTexts?mid="+page.value,
     dataType:"json",
     data:formParam,
     success:function(data){
      alert(data.mytext);
       $("#mytitleDiv").html(data.mytitle);
       $("#mytextDiv").html(data.mytext);
     }
  })
}

function uploadComment(page)
{
  var formParam = $("#myComment").serialize(); 
  $.ajax({
     type:"POST",
     url:"/action/uploadTexts?mid="+page.value,
     dataType:"json",
     data:formParam,
     success:function(data){
      loadComment("top");
     }
  })
}

function deleteComment(page)
{
  $.ajax({
     type:"POST",
     url:"/action/deleteComment?mid="+page,
     dataType:"json",
     data:"{commentid:"+page+"}",
     success:function(data){
      $("#a"+data.commentid).parent().remove();
     }
  })
}

function loginwebsite()
{
  var formParam = $("#logmein").serialize(); 
  $.ajax({
    type:"POST",
    url:"/exe/login",
    dataType:"json",
    data:formParam,
    success:function(data){
      $(".login").hide();

      $(".uploader").show();
      if($(".author").html()==data.auth){
        $(".contentbar .delete").show();
        $(".textform").show();
      }

      $("#user").val(data.auth);
      $("#user").attr("showpage","visible");

      $(".commentform").show();
      {
        $(".commentlist").html("");
        $("#comcount").attr("buttom","1024");
        loadComment("buttom");
      }
    },
    complete:function(XMLHttpRequest,textStatus){
    },
    error:function(e){
      $("#loginerror").html("登录不成功,请重试!");
    }
  })
}

function editertoggle(){
  var user=$("#user").val();
  var auth=$(".author").html();
  var pageshow=$("#user").attr("showpage");
  if(pageshow=="hidden"){
    if(user=="none")
    {
      $(".login").show();
    }
    else
    {
      $(".uploader").show();
      $(".commentform").show();
      if(user==auth)
      {
        $(".textform").show();
        $(".contentbar .delete").show();
      }
      $(".content .delete").show();
    }
    $("#user").attr("showpage","visible");
  }else{
    if(user=="none")
    {
      $(".login").hide();
    }
    else
    {
      $(".uploader").hide();
      $(".commentform").hide();
      if(user==auth)
      {
        $(".textform").hide();
        $(".contentbar .delete").hide();
      }
      $(".content .delete").hide();
    }
    $("#user").attr("showpage","hidden");
  }
}

$(document).ready(function(){
  $(".gochannels").click(function(){
    editertoggle();
  });
  
  $(".gochannel").click(function(){
    loadComment("buttom");
  });
  $("#go").click(function(){
    loginwebsite();
  });
});

function getJsonLength(jsonData){
  var jsonLength = 0;
  for(var item in jsonData){
    jsonLength++;
  }
  return jsonLength;
}

var timeoutProcess;

function loadComment(gettop)
{
  clearTimeout(timeoutProcess);
  var top=parseInt($("#comcount").attr("top"));
  var buttom=parseInt($("#comcount").attr("buttom"));
  var mid=parseInt($("#comcount").attr("lst_id"));
  var pageshow=$("#user").attr("showpage");
  //alert("gettop:"+gettop+" mid:"+mid+" top:"+top+" buttom:"+buttom);
  if(gettop=="top"){
    var req="&top="+top;
  }else{
    var req="&buttom="+buttom;
  }

  $.ajax({
    type:"POST",
    url:"/exe/getComment?mid="+mid+req,
    dataType:"json",
    data:{hear:$("#head").val()},
    success:function(data){
      var obj = eval(data);
      var total=getJsonLength(obj.comments);
      var comment="";
    
      if(total>0){
        for(var i=0;i<total;i++) {
          comment+='<li><h3 class="meta" id=a'+obj.comments[i].id+'>'+obj.comments[i].author
          +'<time>'+obj.comments[i].txt_time +'</time></h3>'
          +'<p class="content">'+obj.comments[i].txt_title;
          if($("#user").val()==obj.comments[i].author){
            comment+='<span class="commentbar">'
            +'<a href="javascript:deleteComment('+obj.comments[i].id+')" ><i class="delete"'+pageshow+' ></i></a>'
            +'</span></p>';
          }
          comment+='</p>\r\n</li>\r\n'; //
        }
        var nowtop=obj.comments[0].id;
        var nowbuttom=obj.comments[total-1].id;
        if(gettop=="top"){
          $(".commentlist").prepend(comment);
          if(nowtop!=top){
            $("#comcount").attr("top",nowtop);
          }
          if(buttom==1024){
            $("#comcount").attr("buttom",nowbuttom);
          }
        }else{
          $(".commentlist").append(comment);
          if(nowbuttom!=buttom){
            $("#comcount").attr("buttom",nowbuttom);
          }
          if(top==1){
            $("#comcount").attr("top",nowtop);
          }
        }
        //alert("top="+obj.comments[0].id+" buttom"+obj.comments[total-1].id);
      }
      timeoutProcess=setTimeout("loadComment(\"top\")",10000);
    },
    complete:function(XMLHttpRequest,textStatus){
      timeoutProcess=setTimeout("loadComment(\"top\")",10000);
    },
    error:function(e){
      $("#head").html("<h2>全部评论</h2>");
    }
  })
}

function replaceDoc(url)
{
  //alert(url);
  window.location.replace(url);
}
