HOMEKI_URL = "http://192.168.0.112:5000";

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

function requestDeviceStatus(id, callback){
    $.ajax({
        url : HOMEKI_URL+ sprintf('/device/%d/get%s',id,unique()),
        cache : false,
        dataType: 'json',
        success : callback,
        error   : function(e) {  callback() }
    });
}

function toggleDevice(deviceId,cb){
    requestDeviceStatus(deviceId, function(device) {
        if(device) {
            $.ajax({
                cache: false,
                url     : HOMEKI_URL + sprintf('/device/%d/channel/0/set?value=%d',device.id,deviceIsOn(device) ? 0 : 1),
                success : function(data){
                    cb(true,!deviceIsOn(device));
                },
                error   : function(e){
                    cb(false);
                }
            });
        }
    })
}