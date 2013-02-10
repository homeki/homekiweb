define(function(require){
    var api      = require('homeki-core').api,
        bootstrap = require('bootstrap.min');

	var $devices = $("#devices");
    api.getAllDevices(function(data){
        $.each(data, function(){
            $("<div/>").appendTo($devices).device({"device" : this});
        });
    });

    $(function(){
    	$("#add-tellstick-switch").click(function(){
    		api.addTellstickSwitch(function(device){
    			$("<div/>").appendTo($devices).device({"device" : device}).hide().fadeIn('slow');
    		});
    	});
    })
})
