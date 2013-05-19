//Author: YuMS
//Date: 2013-5-18

var background = chrome.extension.getBackgroundPage();
function click(e) {
    console.log("in click function");
    console.log(e.target.id);
    switch (background.action[e.target.id].type) {
        case 'tabscript':
            background.tryInitiativeDo(e.target.id, background.action[e.target.id].initScript);
            break;
        case 'newtablink':
            chrome.tabs.create(background.action[e.target.id].script);
            break;
        case 'openoptions':
            chrome.tabs.create({url: "options.html"});
            break;
        case 'toggleback':
            background.toggleBackground();
            break;
    }
    window.close();
}

document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('a');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});

$(document).ready(function() {
            if (background.running) {
                $('#toggleback').html('<span></span>关闭自动提醒');
            } else {
                $('#toggleback').html('<span></span>打开自动提醒');
            }
});