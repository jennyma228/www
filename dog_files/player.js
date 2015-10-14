function playaudio(file)
{
    var html='<p><audio src="'+file+'" autoplay="autoplay" controls="controls" style="max-width: 100%; box-sizing: border-box !important;"></audio></p>';
    $(".myplayer").html(html);
}
function playvideo(file)
{
    var html='<p><video class="edui-upload-video vjs-default-skin video-js" controls="" preload="none" width="320" height="280" src="'+file+'" data-setup="{}"><source src="'+file+'" type="video/mp4"></source></video></p>';
    $(".myplayer").html(html);
}

