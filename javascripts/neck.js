var totaltime = 1000;
var round = 2;
var svghead = '\
    <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\
        <rect cx="300" cy="500" fill="rgba(255,255,255,0.9)" width="200" height="240" />\
        <circle id="circlehead" cx="100" cy="60" r="40" fill="rgba(30,144,255,0.8)"/>\
        <ellipse cx="100" cy="115" rx="50" ry="25" fill="rgba(30,144,255,1)" />\
        <polygon points="50,115 30,210 170,210 150,115" fill="rgba(30,144,255,1)"/>\
    </svg>';
var oldbody = $('body').html();
($('body').children()).wrapAll('<div class="srcpage"></div>');

$("body").append("<div class='neckimage' style='position:absolute; left:"+50+"px;top:"+(document.body.scrollTop+50)+"px;height:1000px;width:1000px;'>"+svghead+"</div>");

var angle=0;
var direction = 1;
var angleedge = 10;
var intevaltimes = 50;
var angleplus = 2.0*angleedge/(totaltime/intevaltimes/round);
var do_neck = setInterval(function(){
    if (!round) return;
    if (direction == 1){
        angle+=angleplus;
    } else {
        angle-=angleplus;
    }
    if (angle >= angleedge || angle <= -angleedge){
        direction = 1 - direction;
    }
    if (angle >= -0.1 && angle <= 0.1){
        round--;
    }

    $('#circlehead').css("transition-timing-function", "ease");
    $('#circlehead').css("-webkit-transform-origin", "100px 100px");
    $('#circlehead').css("-webkit-transform", "rotate("+4*angle+"deg)");
    $('.srcpage').css("transition-timing-function", "ease");
    $('.srcpage').css("-webkit-transform-origin", document.body.clientWidth/2+"px "+(document.body.scrollTop+window.screen.height/2)+"px");
    $('.srcpage').css("-webkit-transform", "rotate("+angle+"deg)");
    window.onscroll = function(){
        $('.srcpage').css("-webkit-transform-origin", document.body.clientWidth/2+"px "+(document.body.scrollTop+window.screen.height/2)+"px");
        $('.neckimage').css("top", (document.body.scrollTop+50)+"px");
        // console.log(document.body.scrollTop+window.screen.height/2);
    }
    if (round == 0){
        // console.log('round is 0');
        clearInterval(do_neck);
        // console.log('interval cleared');
        // console.log('do_neck is', do_neck);
        $('#circlehead').css("-webkit-transform", "rotate(0deg)");
        $('.srcpage').css("-webkit-transform", "rotate(0deg)");
        $('body').html(oldbody);
        window.onscroll = null;
    }
}, intevaltimes);
