define(function(require){
    var api      = require('homeki-core').api,
        bootstrap = require('bootstrap.min');


    api.getAllDevices(function(data){
        var $devices = $("#devices");
        $.each(data, function(){
            $("<div/>").appendTo($devices).device({"device" : this});
        });
    });
})
