$(document).ready(function(){
    var st = window.localStorage;
    arrayday = new Array(24);
    for (var i=0; i<24; ++i){
        arrayday[i] = {"x": i,"y":0}
    }
    arraydd = new Array(31);
    for (var i=0; i<31; ++i){
        arraydd[i]={"x": i+1, "y": 0};
    }
    arraymonth = new Array(12);
    for (var i=0; i<12; ++i){
        arraymonth[i]={"x": i+1, "y": 0};
    }
    datastring = st.getItem('hmstore');
    if(datastring)
    {
        console.log(datastring);
        s = JSON.parse(datastring);
        for (i in s)
        {
            datenow = new Date();
            date = new Date(s[i].stime);
            if(datenow.getMonth() == date.getMonth() && datenow.getDate() == date.getDate()){
                console.log(arrayday[date.getHours()+1]["y"]);
                arrayday[date.getHours()]["y"]++;
            }
            if(datenow.getMonth() == date.getMonth()){
                thisday = date.getDate();
                arraydd[thisday - 1]["y"]++;
            }

            thismonth = date.getMonth();
            arraymonth[thismonth]["y"]++;
        }
    }
    var chart = new CanvasJS.Chart("daychartContainer",
    {
        axisX:{
            title: "时刻",
            interval:2
        },

        axisY:{
            title: "次数",
            minimum: 0
        },

        data: [
        {
            type: "line",
            dataPoints: arrayday
        }
        ]
    });
    chart.render();

    var chart = new CanvasJS.Chart("ddchartContainer",
    {
        axisX:{
            title: "日期",
            interval: 2
        },

        axisY:{
            title: "次数",
            minimum: 0
        },

        data: [
        {
            type: "line",
            dataPoints: arraydd
        }
        ]
    });
    chart.render();

    var chart = new CanvasJS.Chart("monthchartContainer",
    {
        axisX:{
            title: "月份",
            interval: 1
        },

        axisY:{
            title: "次数",
            minimum: 0
        },

        data: [
        {
            type: "column",
            dataPoints: arraymonth
        }
        ]
    });
    chart.render();

    var neckinv, outsideinv, waterinv;
    if (localStorage.getItem("neck")){
        neckinv = JSON.parse(localStorage.getItem("neck"))['interval']/60000;
    } else{
        neckinv = 0;
    }
    if (localStorage.getItem("outside")){
        outsideinv = JSON.parse(localStorage.getItem("outside"))['interval']/60000;
    } else{
        outsideinv = 0;
    }
    if (localStorage.getItem("water")){
        waterinv = JSON.parse(localStorage.getItem("water"))['interval']/60000;
    } else{
        waterinv = 0;
    }

    var outsideinv = JSON.parse(localStorage.getItem("outside"))['interval']/60000;
    var waterinv = JSON.parse(localStorage.getItem("water"))['interval']/60000;
    $(".neck-interval").val(neckinv);
    $(".outside-interval").val(outsideinv);
    $(".water-interval").val(waterinv);

    $("input#appendedPrependedInput").bind("focus", function(){
        $(".alert-success").remove();
    });

    $("#savebtn").click(function(){
        $(".alert-success").remove();
        var neckinv =  $(".neck-interval").val();
        var outsideinv = $(".outside-interval").val();
        var waterinv = $(".water-interval").val();
        var flag = true;
        if (isNaN(parseFloat(neckinv))){
            $(".neck-interval").attr("placeholder", "Float");
            $(".neck-interval").val("");
            flag=false;
        }
        if (isNaN(parseFloat(outsideinv))){
            $(".outside-interval").attr("placeholder", "Float");
            $(".outside-interval").val("");
            flag=false;
        }
        if (isNaN(parseFloat(waterinv))){
            $(".water-interval").attr("placeholder", "Float");
            $(".water-interval").val("");
            flag=false;
        }
        if (!flag){
            return;
        }
        neckinv = parseFloat(neckinv);
        outsideinv = parseFloat(outsideinv);
        waterinv = parseFloat(waterinv);
        var neckdata = {interval: neckinv*60*1000, last: 2000};
        var outsidedata = {interval: outsideinv*60*1000, last: 2000};
        var waterdata = {interval: waterinv*60*1000, last: 2000};
        localStorage.setItem('neck', JSON.stringify(neckdata));
        localStorage.setItem('outside', JSON.stringify(outsidedata));
        localStorage.setItem('water', JSON.stringify(waterdata));
        $('#savebtn').after('\
            <div class="alert alert-success">\
            <button type="button" class="close" data-dismiss="alert">×</button>\
            <strong>Well done!</strong> 信息已经成功更新！\
            </div>');
    });
});
