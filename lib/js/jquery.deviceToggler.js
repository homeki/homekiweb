(function( $ ) {
  	$.fn.deviceToggler = function(dev) {
  		var values = channelValues(dev),
  			isOn = values[0] == 1,
  			dimmer = values[1];
	    var $status = $("<p/>").addClass("status-icon").css("float","left")
	        .toggleClass('status-on',isOn).data(dev).bind('click', toggleDeviceFunction);

	    var $device = $("<div/>").addClass("span4")
	        .prepend($status)
	        .append($("<h2/>").html(dev.name))
	        .append($("<p/>").html(dev.description).addClass("description"))
	        .append($("<button/>").attr({type:"button",class:"btn"})
	            .html('Switch').click(function(){
	                $status.trigger('click');
	            }));
	    if(dev.type == 'dimmer'){
	        var $slider = $("<div/>").addClass("switch-slider").slider({
	        	min: 0,
	        	max: 255,
	        	value: dimmer,
	        }).appendTo($device);
	        setInterval(function(){
	        	if(dimmer != $slider.slider("value")){
	        		dimmer = $slider.slider("value");
	        		if(dimmer > 0 && !$status.hasClass('status-on')) {
	        			setDeviceChannelValue(dev.id,0,1, function(){
	        				setDeviceChannelValue(dev.id,1,dimmer);
	        			});
	        			$status.addClass('status-on');
	        		} else {
	        			setDeviceChannelValue(dev.id,1,dimmer);
	        		}
	        		
	        	}
	        },500);
	    }
	    return $device;
  	};
})( jQuery );