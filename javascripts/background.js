//Author: YuMS
//Date: 2013-5-18

// var defaults = {
//     interval: 1800000,  //30min
//     last: 180000,       //3min
// }
var defaults = {
    interval: 15000,  //10s
    last: 2000,       //2s
}
var lock = false;
var activityNames = ['neck', 'outside', 'water'];
var running = false;
var action = {
    neck: {type: 'tabscript', script: {file: 'javascripts/neck.js'}, initScript: {file: 'javascripts/neck.js'}},
    outside: {type: 'tabscript', script: {file: 'javascripts/outside.js'}, initScript: {file: 'javascripts/outside_init.js'}},
    water: {type: 'tabscript', script: {file: 'javascripts/water.js'}, initScript: {file: 'javascripts/water_init.js'}},
    settings: {type: 'openoptions'},
    toggleback: {type: 'toggleback'},
    suggestion: {type: 'newtablink', script: {url: 'http://google.com'}}
}
var activities = new Array();
var pushToStorage = function(item, stime, type) {
    var store = localStorage.getItem('hmstore');
    var row = new Object();
    row.item = item;
    row.stime = stime;
    row.type = type;
    if (!store) {
        store = new Array();
        store.push(row);
        localStorage.setItem('hmstore', JSON.stringify(store));
    } else {
        store = JSON.parse(store);
        store.push(row);
        localStorage.setItem('hmstore', JSON.stringify(store));
    }
}
var retryUntilUnlock = function(activity) {
    if (!lock) {
        lock = activity.last + 1000;
        setTimeout(function() {
            lock = false;
        }, activity.last);
        pushToStorage(activity.name, new Date(), 0);
        return activity.action();
    } else {
        setTimeout(function() {
            retryUntilUnlock(activity);
        }, lock);
    }
}
var notifyPost = function(name) {
    for (i in activities) {
        if (activities[i].name == name) {
            lock = activities[i].last + 1000;
            setTimeout(function() {
                lock = false;
            }, activities[i].last);
            //Buggy notify, when the activity is waiting for the lock, it will still be triggered
            if (activities[i].intervalHandler) {
                clearInterval(activities[i].intervalHandler);
                activities[i].intervalHandler = setInterval(retryUntilUnlock, activities[i].interval, activities[i]);
            }
        }
    }
}
var toggleBackground = function() {
    if (running) {
        for (i in activities) {
            if (activities[i].intervalHandler) {
                clearInterval(activities[i].intervalHandler);
                activities[i].intervalHandler = null;
            }
        }
        running = false;
    } else {
        for (i in activities) {
            if (activities[i].intervalHandler) {
                clearInterval(activities[i].intervalHandler);
                activities[i].intervalHandler = setInterval(retryUntilUnlock, activities[i].interval, activities[i]);
            } else {
                activities[i].intervalHandler = setInterval(retryUntilUnlock, activities[i].interval, activities[i]);
            }
        }
        running = true;
    }
}
var tryInitiativeDo = function(item, script) {
    if (lock) {
        console.log('locked');
        return;
    }
    chrome.tabs.executeScript(null, script);  //I' ve loaded jquery in manifest content_script part for this executeScript world
    pushToStorage(item, new Date(), 1);
    notifyPost(item);
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (lock) return;
        var item;
        switch (request.key) {
        case 'A':
            item = 'neck';
            break;
        case 'S':
            item = 'outside';
            break;
        case 'D':
            item = 'water';
            break;
        }
        tryInitiativeDo(item, action[item].initScript);
    });
var Activity = function(name) {
    this.name = name;
    var settings = localStorage.getItem(name);
    if (settings) {
        settings = JSON.parse(settings);
        this.interval = settings.interval || defaults.interval;
        this.last = settings.last || defaults.last;
    } else {
        this.interval = defaults.interval;
        this.last = defaults.last;
    }
    this.action = function() {};
    this.setAction = function(action) {this.action = action;};
    this.intervalHandler = null;
}
      // sendResponse({farewell: "goodbye"});
var activity;
var i;
for (i in activityNames) {
	activities.push(new Activity(activityNames[i]));
}
activities[0].setAction(function() {
    chrome.tabs.executeScript(null, action[activities[0].name].script);
});
activities[1].setAction(function() {
    chrome.tabs.executeScript(null, action[activities[1].name].script);
});
activities[2].setAction(function() {
    chrome.tabs.executeScript(null, action[activities[2].name].script);
});
    //http://stackoverflow.com/questions/1190642/how-can-i-pass-a-parameter-to-a-settimeout-callback
    //The top one answer sucks. When I implement using the anonymous function way like this
// for (i in activities) {
    // setInterval(function() {
    //     retryUntilUnlock(activities[i].last, activities[i].action);
    // }, activities[i].interval);
// }
    //i will always be 2 when running the anonymous function.
    //At last, I did it in the following way, which made me sick.
    //
    // setInterval(function() {
    //     retryUntilUnlock(activities[0].last, activities[0].action);
    // }, activities[0].interval);
    // setInterval(function() {
    //     retryUntilUnlock(activities[1].last, activities[1].action);
    // }, activities[1].interval);
    // setInterval(function() {
    //     retryUntilUnlock(activities[2].last, activities[2].action);
    // }, activities[2].interval);
    //
    //Finally, the following way works well though the top one answer said this is not the "standard" one.LOL

    // activities[0].intervalHandler = setInterval(retryUntilUnlock, activities[0].interval, activities[0]);
// for (i in activities) {
//     activities[i].intervalHandler = setInterval(retryUntilUnlock, activities[i].interval, activities[i]);
// }
