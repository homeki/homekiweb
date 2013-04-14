define(['jquery','ext/jquery-ui','ext/sprintf'],function($){
    var exports = {};
    var production =  window.location.hostname != "127.0.0.1" 
                   && window.location.hostname != "localhost";
    var url = "http://" + window.location.hostname + ":5000" 
    // Put your own development url here
    if(!production) {
        //url = "http://" + "192.168.0.112" + ":5000";
        url = "http://hem.sonhult.se:5000"
    };
    
    exports.params = {
        url : url
    };
    // AAAAAAAAAAAAAAAAAAA
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
            console.log && console.log("Pretending everything is fine, error message:",err);
            opts.success.call(this);
            /*
            if(err.message.indexOf("unexpected_token") == 0){
                console.log("Unexpected token at url " + url + ", assuming OK.");
                opts.success.call(this);
            } else {
            console.log("Kijax error! URL:",url," Options:",options,"DAT DERE ERRER:",err);
            }
            */
        }
        $.ajax(opts);
    }

    exports.channelValues = function(device){
        var values = {};
        for(i in device.channelValues){
            values[device.channelValues[i].id] = parseInt(device.channelValues[i].lastValue,10);
        }
        return values;
    }

    /*
    *  Return which fiels should be visible in the controller for 
    *  for a certain type of device.
    */
    exports.getControllerConfig = function(type) {
        var fields = {};
        var swtch     = type == 'switch',
            dimmer    = type == 'dimmer',
            tellstick = dimmer || swtch,
            therm     = type == 'thermometer';
        fields.title = true;
        fields.description = true;
        fields.slider = dimmer;
        fields.toggler = tellstick;
        fields.learn = tellstick;

        fields.temperature = therm;
        return fields;
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

    exports.getAllDevices = function(callback){
        $.kijax('/device/list',callback);
    }

    exports.addTellstickSwitch = function(callback){
        $.kijax('/device/tellstick/add',function(data){
                exports.requestDeviceStatus(data.id, function(device){
                    callback(device);
                });
            },{
            data : JSON.stringify({
                type : "switch",
                name  : "New Switch Device",
                description : "A device you just created.",
                house : 6+Math.floor(Math.random()*100000)*4,
                unit   : 6+Math.floor(Math.random()*100000)*4
            })
        });
    }

    exports.addTellstickDimmer = function(callback){
        $.kijax('/device/tellstick/add',function(data){
                exports.requestDeviceStatus(data.id, function(device){
                    callback(device);
                });
            },{
            data : JSON.stringify({
                type : "dimmer",
                name  : "New Dimmer Device",
                description : "A device you just created.",
                house : 6+Math.floor(Math.random()*100000)*4,
                unit   : 6+Math.floor(Math.random()*100000)*4
            })
        });
    }

    exports.requestDeviceStatus = function(id, callback){
        $.kijax(sprintf('/device/%d/get',id), callback, 
            {error : callback});
    }

    exports.sendLearnSignal = function(id, callback){
        $.kijax(sprintf('/device/%d/tellstick/learn',id), callback, 
            {error : callback});
    }

    exports.removeDevice = function(id, callback){
        $.kijax(sprintf('/device/%d/delete',id), callback, 
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

                        url     : url + sprintf('/device/%d/channel/%d/set?value=%d',device.id,channel,value),
                        success : function(data){
                            setTimeout(function(){
                                exports.requestDeviceStatus(deviceId, function(device) {
                                    var values = exports.channelValues(device);
                                    if(value != values[channel]) window.console && console.log ("Status did not change!");
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