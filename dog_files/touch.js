//全局变量，触摸开始位置
var startX = 0, startY = 0;

//touchstart事件
function touchSatrtFunc(evt) {
  try {//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
      var touch = evt.touches[0]; //获取第一个触点 
      startX = Number(touch.pageX); //页面触点X坐标 记录触点初始位置
      startY = Number(touch.pageY); //页面触点Y坐标 记录触点初始位置
  }
  catch (e) {//alert('touchSatrtFunc：' + e.message);
  }
}

//touchmove事件
function touchMoveFunc(evt) {
  try {//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
    var touch = evt.touches[0]; //获取第一个触点
    var difx=Number(touch.pageX) - startX; //页面触点X坐标
    var dify=Number(touch.pageY) - startY; //页面触点Y坐标
    //判断滑动方向
    if (Math.abs(difx) > 80) {
      if(difx==Math.abs(difx)){
        //alert('向右滑动');
        loadPage("last");
        //replaceDoc("./exe/nextPage?mid="+$("#comcount").attr("lst_id")+"&next_last=0");
      } else {
        //alert('向左滑动');
        loadPage("next");
        //replaceDoc("./exe/nextPage?mid="+$("#comcount").attr("lst_id")+"&next_last=1");
      }
    }
    if (Math.abs(dify) > 80) {
      if(dify==Math.abs(dify)){
        //alert('向下滑动');
      } else {
        //alert('向上滑动');
      }
    }
  }
  catch (e) { //alert('touchMoveFunc：' + e.message);
  }
}

//touchend事件
function touchEndFunc(evt) {
  try {//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
  }
  catch (e) {//alert('touchEndFunc：' + e.message);
  }
}

//绑定事件
function bindEvent() {
  document.addEventListener('touchstart', touchSatrtFunc, false);
  document.addEventListener('touchmove', touchMoveFunc, false);
  document.addEventListener('touchend', touchEndFunc, false);
}

//判断是否支持触摸事件
function isTouchDevice() {
  //alert(navigator.appVersion);
  try { //alert("支持TouchEvent事件！");
    document.createEvent("TouchEvent");
    bindEvent(); //绑定事件
  }
  catch (e) { //alert("不支持TouchEvent事件！" + e.message);
  }
}

window.onload = isTouchDevice;

