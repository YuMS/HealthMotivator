function start_neck(){
    var totaltime = arguments[0]?arguments[0]:1000;
    var round = arguments[1]?arguments[1]:20
    var svghead = '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\
<rect cx="0" cy="0" fill="rgba(255,255,255,0.7)" width="200" height="240" />\
<circle id="circlehead" cx="100" cy="60" r="40" fill="gray"/>\
<ellipse cx="100" cy="115" rx="50" ry="25" fill="gray" />\
<polygon points="50,115 30,210 170,210 150,115" fill="gray"/>\
</svg>';
    var oldbody = $('body').html();
    ($('body').children()).wrapAll('<div class="srcpage"></div>');

    $("body").append("<div class='neckimage' style='position:absolute; left:0px;top:0px;height:1000px;width:1000px;'>"+svghead+"</div>");

    var angle=0;
    var direction = 1;
    var angleedge = 10;
    var intevaltimes = 1;
    var angleplus = 2.0*angleedge/(totaltime/intevaltimes/round);
    var do_neck = setInterval(function(){
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
        $('#circlehead').css("-webkit-transform-origin", "100px 100px");
        $('#circlehead').css("-webkit-transform", "rotate("+2*angle+"deg)");
        $('.srcpage').css("-webkit-transform", "rotate("+angle+"deg)");
        if (round == 0){
            $('#circlehead').css("-webkit-transform", "rotate(0deg)");
            $('.srcpage').css("-webkit-transform", "rotate(0deg)");
            $('body').html(oldbody);
            clearInterval(do_neck);
        }
    }, intevaltimes);
}

function start_outside(){
    var oldbody = $('body').html();
    ($('body').children()).wrapAll('<div class="srcpage"></div>');
    $("body").append("<div style='position:absolute; left:0px;top:0px;background-color: rgba(255,255,0,0.5) ;height:1000px;width:1000px;'>看看窗外吧</div>");
    setTimeout(function(){
        $('body').html(oldbody);
    }, 5*1000);
}

function start_water(){
    var oldbody = $('body').html();
    ($('body').children()).wrapAll('<div class="srcpage"></div>');
    var direction = 1;
    var i = 0;
    var shakeInt = setInterval(function(){
        direction = - direction;
        i++;
        $('.srcpage').css("-webkit-transform", "translate("+direction*5+"px, "+direction*5+"px)");
        if (i==80){
            clearInterval(shakeInt);
            $('.srcpage').css("-webkit-transform", "translate(0px, 0px)");
            $('.srcpage').animate({opacity: '0.5'});
            var svgwater='<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\
<ellipse cx="150" cy="200" rx="45" ry="15" fill="black" />\
<polygon points="100,100 120,200 180,200 200,100" fill="gray"/>\
<polygon id="water" points="100,100 120,200 180,200 200,100" fill="blue"/>\
</svg>';

            $("body").append("<div style='position:absolute; left:0px;top:0px;height:1000px;width:1000px;'>"+svgwater+"</div>");
        
            var j =0;
            var k =0;
            //100 times
            var stepx=0.2;
            var stepy=1;
            var drinkwater = setInterval(function(){
                k++;
                $('#water').attr('points', (100+stepx*k)+','+(100+stepy*k)+' 120,200 180,200 '+(200-stepx*k)+','+(100+stepy*k)) ;
                if (k == 100){
                    j++;
                    k=0;
                    if (j == 10){
                        $('body').html(oldbody);
                        clearInterval(drinkwater);
                    }
                }
            },10);
        }
    },2);
}