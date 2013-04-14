define(function(require){
    var api      = require('homeki-core').api,
        bootstrap = require('bootstrap-min');

    $(function(){
        var $devices = $("#devices");
        var dimmerFields = api.getControllerConfig('dimmer'),
            switchFields = api.getControllerConfig('switch'),
            temperatureFields = api.getControllerConfig('temperature');
        api.getAllDevices(function(data){
            $.each(data, function(){
                if(!this.type) return alert("There's something wrong with this banana!");
                var fields = api.getControllerConfig(this.type);
                $("<div/>").appendTo($devices).controller({"device" : this, fields : fields});
            });
        });
    	$("#add-tellstick-switch").click(function(){
    		api.addTellstickSwitch(function(device){
    			$("<div/>").appendTo($devices).controller({"device" : device, fields : switchFields}).hide().fadeIn('slow');
    		});
    	});
        $("#add-tellstick-dimmer").click(function(){
            api.addTellstickDimmer(function(device){
                $("<div/>").appendTo($devices).controller({"device" : device, fields : dimmerFields}).hide().fadeIn('slow');
            });
        });
    })
})
