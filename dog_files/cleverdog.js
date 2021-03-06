function uploadTxt(page)
{
  var text=document.getElementById("pagetext").value;
  var title=document.getElementById("pagetitle").value;
  //haha=((haha.replace(/<(.+?)>/gi,"&lt;$1&gt;")).replace(/ /gi,"&nbsp;")).replace(/\n/g,"<br/>");
  document.getElementById("pagetext").value=encodeURIComponent(text);
  document.getElementById("pagetitle").value=encodeURIComponent(title);

  var formParam = $("#formpageText").serialize(); 
  $.ajax({
     type:"POST",
     url:"/action/uploadTexts?mid="+page.value,
     dataType:"json",
     data:formParam,
     success:function(data){
       $("#mytitleDiv").html(decodeURIComponent(data.mytitle));
       $("#mytextDiv").html(decodeURIComponent(data.mytext));
     }
  })
  document.getElementById("pagetext").value=text;
  document.getElementById("pagetitle").value=title;
}

function uploadComment(page)
{
  var haha=document.getElementById("commentstring").value;
  document.getElementById("commentstring").value=encodeURIComponent(haha);
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
  document.getElementById("commentstring").value=haha;
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
      if(($(".author").html()==data.auth)||(data.auth == 'admin')){
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
      $("#loginok").html('<a href="./index.jst?mid=1">返回</a>');
    },
    complete:function(XMLHttpRequest,textStatus){
    },
    error:function(e){
      $("#loginerror").html("登录不成功,请重试!");
    }
  })
}

function registerwebsite()
{
  var formParam = $("#registerform").serialize(); 
  $.ajax({
    type:"POST",
    url:"/exe/registerin",
    dataType:"json",
    data:formParam,
    success:function(data){
      //alert(data.register+'='+$("#username").val());
      if(data.register==$("#username").val()){
        $("#loginmsg").html('注册成功!<a href="./index.jst?mid=1">返回</a>');
      }else{
        $("#loginmsg").html('注册不成功,请重试!【'+data.register+'】或<a href="./index.jst?mid=1">放弃</a>');
      }
    },
    complete:function(XMLHttpRequest,textStatus){
    },
    error:function(e){
      $("#loginmsg").html("注册不成功,请重试!");
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
      if((user==auth)||(user=='admin'))
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
      if((user==auth)||(user=='admin'))
      {
        $(".textform").hide();
        $(".contentbar .delete").hide();
      }
      $(".content .delete").hide();
    }
    $("#user").attr("showpage","hidden");
  }
}

function pageName()
{
  var a = location.href;
  var b = a.split("/");
  var c = b.slice(b.length-1, b.length).toString(String).split(".");
  return c.slice(0, 1);
}

$(document).ready(function(){
  var currentpage = pageName();
  if(currentpage != "upload"){
	  var obj = document.getElementById("mynav").getElementsByTagName("li");
    var ch = $("#currentstate").attr("channel_id");
	  obj[ch].className="on";
  }

  $(".gochannels").click(function(){
    editertoggle();
  });
  
  $(".gochannel").click(function(){
    loadComment("buttom");
  });
  $("#go").click(function(){
    loginwebsite();
  });
  $(".last").click(function(){
    //var currentpage = pageName();
    //if(currentpage != "page"){
    //  history.back();
    //}
    loadPage("last");
  });
  $(".next").click(function(){
    loadPage("next");
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
    data:{mid:$("#comcount").attr("lst_id")},
    success:function(data){
      var obj = eval(data);
      var total=getJsonLength(obj.comments);
      var comment="";
    
      if(total>0){
        for(var i=0;i<total;i++) {
          comment+='<li><h3 class="meta" id=a'+obj.comments[i].id+'>'+obj.comments[i].author
          +'<time>'+obj.comments[i].txt_time +'</time></h3>'
          +'<p class="content">'+ decodeURIComponent(obj.comments[i].txt_text);
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
      timeoutProcess=setTimeout("loadComment(\"top\")",20000);
    },
    complete:function(XMLHttpRequest,textStatus){
      timeoutProcess=setTimeout("loadComment(\"top\")",20000);
    },
    error:function(e){
      $("#head").html("<h2>全部评论</h2>");
    }
  })
}

function loadPage(next_last)
{
  var mid=parseInt($("#comcount").attr("lst_id"));
  var flag=(next_last=="last")?"1":"0";
  //alert("next_last:"+next_last+" flag:"+flag);
  var currentpage = pageName();
 
  $.ajax({
    type:"POST",
    url:"/exe/nextPage?mid="+mid+"&next_last="+flag,
    dataType:"json",
    data:{mid:$("#comcount").attr("lst_id")},
    success:function(data){
      if(parseInt(data.id)!=mid){
        if(data.pagemode == "html"){
          window.location.href="./templet_a.jst?mid="+data.id;
        } else if (currentpage != "page"){
          window.location.href="./page.jst?mid="+data.id;
        } else {
          //alert("page="+data.id+" time"+data.txt_time+" author"+data.author+" title"+data.txt_title+" text"+data.txt_content+" picture"+data.picture);
          document.title=data.txt_title;
          $("#mytitleDiv").html(decodeURIComponent(data.txt_title));
          $(".time").html(data.txt_time);
          $(".author").html(data.author);
          $("#delete").attr("href","./action/deletePage?mid="+data.id);
          $("#uploader").attr("href","./upload.jst?mid="+data.id);
          $("#mytextDiv").html(decodeURIComponent(data.txt_content));
          $("#imgsrc").attr("src",data.picture);
          $("#comcount").attr("lst_id",data.id);
          $("#comcount").attr("buttom","1024");
          $("#comcount").attr("top","1");
          $(".commentlist").html("");
          $("#upTxt").attr("value",data.id);
          $("#upComment").attr("value",data.id);
          $("#returnmain").attr("href","./exe/returnIndex?mid="+data.id);
          loadComment("buttom");
        }
      }
    },
    complete:function(XMLHttpRequest,textStatus){
    },
    error:function(e){
    }
  })
}

function replaceDoc(url)
{
  //alert(url);
  window.location.replace(url);
}
