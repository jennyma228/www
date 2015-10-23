function playaudio(file)
{
    var html='<p><audio src="'+file+'" autoplay="autoplay" controls="controls" style="max-width: 100%; box-sizing: border-box !important;"></audio></p>';
    $(".myplayer").html(html);
}
function playvideo(file)
{
    var myVid=document.getElementById("video1");
    if(myVid!=null){
        if(myVid.currentTime!=0)
            myVid.currentTime=0;
    }
    var html='<p><video id="video1" class="edui-upload-video vjs-default-skin video-js" controls="controls" autoplay="autoplay" preload="none" width=100%; data-setup="{}"><source src="'+file+'" type="video/mp4"></source>Your browser does not support the video tag.</video></p>';
    $(".myplayer").html(html);
}

function playmedia()
{
  var mediafile = $("#mediafile").val();
  if(mediafile!="select"){
    $("#msg").html("正在播放"+mediafile); 
    var filetype = mediafile.substring(mediafile.lastIndexOf(".")).toLowerCase();
    if(filetype=='.mp4')
      playvideo(mediafile);
    else if(filetype=='.mp3')
      playaudio(mediafile);
    else
      $("#msg").html("无法播放"+mediafile); 
  }
}

$(document).ready(function()
{
//  $('#form1').bind('submit', function(){
//    playmedia(this, function(data){
//    });
//    return false;
//  });
});


