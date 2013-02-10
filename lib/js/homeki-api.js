define(['jquery','ext/jquery-ui-1.8.23.custom.min','ext/sprintf-0.7-beta1'],function($){
    var exports = {};
    var production = false;
    var url = "http://" + window.location.hostname + ":5000" 
    if(!production) url = "http://" + "192.168.0.112" + ":5000";
    exports.params = {
        url : url
    };

    
    $.kijax = function(url, success, options){
        var opts = {
            url : exports.params.url + url,
            cache : false,
            dataType: 'json',
            timeout: 3000,
            success : success || function(){},
            type : (options && options.data) ? "POST" : "GET"
        };
        for(k in options) opts[k] = options[k];

        opts.error = function(xhr,opt,err){
            if(err.type == "unexpected_token"){
                console.log("Unexpected token at url " + url + ", assuming OK.");
                opts.success.call(this);

            } else {
            console.log("Kijax error! URL:",url," Options:",options,"DAT DERE ERRER:",err);
            }
        }
        $.ajax(opts);
    }

    var _unique = (new Date()).getTime();
    function unique(){
        _unique = _unique + 1;
        return "?_="+_unique;
    }

    exports.deviceIsOn = function(device){
        if(!device.channelValues || !device.channelValues.length) return false;
        for(i in device.channelValues){
            if(device.channelValues[i].id == 0) return device.channelValues[i].lastValue == 1;
        }
        return false;
    }

    exports.getAllDevices = function(cb){
        $.kijax('/device/list',cb);
    }


    exports.requestDeviceStatus = function(id, callback){
        $.kijax(sprintf('/device/%d/get%s',id,unique()), callback, 
            {error : callback});
    }


    exports.setDeviceProperties = function(deviceId, name, description){
        $.kijax(sprintf('/device/%d/set', deviceId), undefined, {
            data : sprintf("{ name : '%s', description : '%s' }", name, description)
        });
    }

    exports.setDeviceChannelValue = function(deviceId,channel,value,cb){
            exports.requestDeviceStatus(deviceId, function(device) {
                if(device) {
                    $.ajax({
                        timeout: 3000,
                        cache: false,

                        url     : homeki.url + sprintf('/device/%d/channel/%d/set?value=%d',device.id,channel,value),
                        success : function(data){
                            setTimeout(function(){
                                exports.requestDeviceStatus(deviceId, function(device) {
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

    return exports;
})