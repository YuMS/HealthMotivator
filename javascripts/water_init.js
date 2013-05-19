var oldbody = $('body').html();
($('body').children()).wrapAll('<div class="srcpage"></div>');
$("body").append('\
<div id="outsidepage" style="margin:20px;position:absolute; display:none;left:0px;top:'+document.body.scrollTop+'px;height:'+(document.body.clientHeight-40)+'px;width:'+(document.body.clientWidth-40)+'px">\
    <div style="width:600px;margin-right:auto;margin-left:auto;margin-top:300px;text-align:center;">\
        <p style="background-color:rgba(255,255,255,0.9);font-size:1.5em;">\
            <br>多喝水可以让身体保持最佳状态，加油!\
            <br>\
            <br>\
        </p>\
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
}, 1500);