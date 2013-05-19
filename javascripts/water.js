var oldbody = $('body').html();
($('body').children()).wrapAll('<div class="srcpage"></div>');
var direction = 1;
var i = 0;
var shakeInt = setInterval(function(){
    if (i == 80) return;
    direction = - direction;
    i += 10;
    $('.srcpage').css("-webkit-transform", "translate("+direction*5+"px, "+direction*5+"px)");
    if (i==80){
        clearInterval(shakeInt);
        $('.srcpage').css("-webkit-transform", "translate(0px, 0px)");
        $('.srcpage').animate({opacity: '0.5'});
        var svgwater='\
        <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\
            <ellipse cx="150" cy="200" rx="45" ry="15" fill="#2F4F4F" />\
            <polygon points="100,100 120,200 180,200 200,100" fill="#F5F5F5" stroke="#000000" stroke-width="0.4"/>\
            <polygon id="water" points="100,100 120,200 180,200 200,100" fill="#1E90FF"/>\
        </svg>';

        $("body").append("<div id='watercup', style='position:absolute; left:"+500+"px;top:"+(document.body.scrollTop+20)+"px;height:"+document.body.clientHeight+"px;width:"+document.body.clientWidth+"px;'>"+svgwater+"</div>");
        window.onscroll = function(){
            $('#watercup').css("top", (document.body.scrollTop+20)+"px");
        }
        var j =0;
        var k =0;
        //100 times
        var stepx=0.2;
        var stepy=1;
        var drinkwater = setInterval(function(){
            k+=20;
            $('#water').attr('points', (100+stepx*k)+','+(100+stepy*k)+' 120,200 180,200 '+(200-stepx*k)+','+(100+stepy*k)) ;
            if (k == 100){
                j++;
                k=0;
                if (j == 2){
                    clearInterval(drinkwater);
                    $('body').html(oldbody);
                    window.onscroll = null;
                }
            }
        },100);
    }
},2);