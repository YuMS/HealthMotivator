var oldbody = $('body').html();
($('body').children()).wrapAll('<div class="srcpage"></div>');
$("body").append('\
<div id="outsidepage" style="margin:20px;position:absolute; display:none;left:0px;top:'+document.body.scrollTop+'px;height:'+(document.body.clientHeight-40)+'px;width:'+(document.body.clientWidth-40)+'px">\
    <div style="width:600px;margin-right:auto;margin-left:auto;margin-top:40px;background-color:rgba(255,255,255,0.8);text-align:center;">\
        <p>\
            <br>窗外的世界是什么颜色的？\
            <br>是绿的，<br>河岸上的柳树随风飘扬，\
            <br>对面公园的榕树重重叠叠。\
            <br>窗外的世界是什么颜色的？\
            <br>是蓝的，\
            <br>天空好似蓝宝石，\
            <br>蓝蓝的海水不时跳出几条小鱼。\
            <br>窗外的世界是什么颜色的？\
            <br>是金的，\
            <br>金色的太阳暖着人们，\
            <br>金色的阳光在河面上撒满了黄宝石。\
            <br>啊！我知道了！\
            <br>窗外的世界是五彩的。\
            <br>绿绿的树，\
            <br>蓝蓝的天，\
            <br>金色的太阳，\
            <br>窗外的世界，\
            <br>真美！\
            <br>\
        </p>\
        <h1 style="color: #000000;margin:20px; text-shadow: 1px 1px 0px #eee, 3px 3px 0px #707070; margin-top:20px;">歇一会，去窗外看看吧～</h1>\
        <br>\
    </div>\
</div>');
$('#outsidepage').fadeIn('slow');
window.onscroll = function(){
    $('#outsidepage').css("top", document.body.scrollTop+"px");
}
setTimeout(function(){
    $('#outsidepage').fadeOut('slow', function(){
        $('body').html(oldbody);
        window.onscroll = null;
    });
}, 1000);