HOMEKI_URL = "http://" + window.location.hostname + ":5000";
//HOMEKI_URL = "http://" + "192.168.0.112" + ":5000";

var _unique = (new Date()).getTime();
function unique(){
    _unique = _unique + 1;
    return "?_="+_unique;
}

function deviceIsOn(device){
    if(!device.channelValues || !device.channelValues.length) return false;
    for(i in device.channelValues){
        if(device.channelValues[i].id == 0) return device.channelValues[i].lastValue == 1;
    }
    return false;
}

function channelValues(device){
    var values = {};
    for(i in device.channelValues){
        values[device.channelValues[i].id] = parseInt(device.channelValues[i].lastValue,10);
    }
    return values;
}


function requestDeviceStatus(id, callback){
    $.ajax({
        url : HOMEKI_URL+ sprintf('/device/%d/get%s',id,unique()),
        cache : false,
        timeout: 3000,
        dataType: 'json',
        success : callback,
        error   : function(e) {  callback() }
    });
}

function toggleDevice(deviceId,cb){
        requestDeviceStatus(deviceId, function(device) {
            if(device) {
                var wasOn = deviceIsOn(device);
                $.ajax({
                    timeout: 3000,
                    cache: false,
                    url     : HOMEKI_URL + sprintf('/device/%d/channel/0/set?value=%d',device.id,deviceIsOn(device) ? 0 : 1),
                    success : function(data){
                        setTimeout(function(){
                            requestDeviceStatus(deviceId, function(device) {
                                if(wasOn == deviceIsOn(device)) alert("Status did not change!");
                                cb(true,deviceIsOn(device));
                            });
                        },500);
                    },
                    error   : function(e){
                        cb(false);
                    }
                });
            } else {
                cb(false)
            }
        })
}

function setDeviceProperties(deviceId, name, description){
    $.ajax({
        timeout: 3000,
        cache  : false,
        type   : 'POST',
        dataType : 'text',
        url    : HOMEKI_URL + sprintf('/device/%d/set', deviceId),
        data   : sprintf("{ name : '%s', description : '%s' }", name, description)
    });
}

function setDeviceChannelValue(deviceId,channel,value,cb){
        requestDeviceStatus(deviceId, function(device) {
            if(device) {
                $.ajax({
                    timeout: 3000,
                    cache: false,

                    url     : HOMEKI_URL + sprintf('/device/%d/channel/%d/set?value=%d',device.id,channel,value),
                    success : function(data){
                        setTimeout(function(){
                            requestDeviceStatus(deviceId, function(device) {
                                var values = channelValues(device);
                                if(value != values[channel]) alert("Status did not change!");
                                cb && cb(true,channel,value);
                            });
                        },500);
                    },
                    error   : function(e){
                        cb && cb(false);
                    }
                });
            } else {
                cb && cb(false)
            }
        })
}