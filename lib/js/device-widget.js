define(['jquery','ext/jquery-ui-1.8.23.custom.min','homeki-api'], function($,ui,api){

	var exports = {};
	exports.channelValues = function(device){
	    return false;
	    var values = {};
	    for(i in device.channelValues){
	        values[device.channelValues[i].id] = parseInt(device.channelValues[i].lastValue,10);
	    }
	    return values;
	}

    exports.toggleDeviceFunction = function(device){
        var $btn = $(this);
        if(!$btn.hasClass('status-loading')) {
            $btn.addClass('status-loading');
            exports.toggleDevice($btn.data('id'), function(success, status){
                if(success) {
                    $btn.toggleClass('status-on' , status).removeClass('status-loading');
                }
                else {
                    $btn.removeClass('status-loading').addClass('status-error');
                    window.setInterval(function(){
                        $btn.removeClass('status-error');
                    }, 3000);
                }
            });
        }
    }

	function toggleEdit(){
		var $this = $(this),
			$holder = $this.parents(".device-holder");
			
		if($this.hasClass("editing")){
			data = [];
			$(".editor",$holder).each(function(){
				var $$= $(this),
				    $for = $$.data("for");
					$for.text($$.val()).show();
					data.push($$.val());
					$$.remove();
			});
			api.setDeviceProperties($holder.data("id"), data[0], data[1]);
			$this.html("Edit");
		} else {
			$(".editable",$holder).each(function(){
				var $$ = $(this);
				$(this).before($("<input/>").addClass("editor")
					.attr("type","text")
					.data("for",$$)
					.keyup(function(e){
		            	if (e.keyCode == 13) toggleEdit.call($this)
		            })
					.val($$.text()))
				.hide();
			});
			$this.html("Save");
		}
		$this.toggleClass("editing");
	}

	exports.toggleDevice = function(deviceId,cb){
        api.requestDeviceStatus(deviceId, function(device) {
            if(device) {
                var wasOn = api.deviceIsOn(device);
                $.kijax(sprintf('/device/%d/channel/0/set?value=%d',device.id,api.deviceIsOn(device) ? 0 : 1),
                	function(data){
                        setTimeout(function(){
                            api.requestDeviceStatus(deviceId, function(device) {
                                if(wasOn == api.deviceIsOn(device)) alert("Status did not change!");
                                cb(true,api.deviceIsOn(device));
                            });
                        },500);
                    }, {
                    	timeout: 3000,
                    	error: function(e){
                        	cb(false);
                    	}
                    });
            } else {
                cb(false)
            }
        })
	}

	$.widget("homeki.device", {
		options : {
		},

		_create : function() {
			var self = this,
				o    = self.options,
				el   = self.element,
				dev  = o.device;
	  		var values = exports.channelValues(dev),
	  			isOn = values[0] == 1,
	  			dimmer = values[1];
		    var $status = $("<p/>").addClass("status-icon").css("float","left")
		        .toggleClass('status-on',isOn).data(dev).bind('click', exports.toggleDeviceFunction);

		    var $device = $(el).data("id",dev.id).addClass("span4").addClass("device-holder")
		        .prepend($status)
		        .append($("<h2/>").html(dev.name).addClass("editable"))
		        .append($("<p/>").html(dev.description).addClass("description").addClass("editable"))
		        .append($("<button/>").attr({type:"button",class:"btn"})
		            .html('Edit').click(toggleEdit))
		        .append($("<button/>").attr({type:"button",class:"btn"})
		            .html('Manage').click(function(){
		               	$device.find('.deviceManager').modal('show');
		            }))
		        .append($("<hr/>"))
		        .append($("<button/>").attr({type:"button",class:"btn"})
		            .html('Switch').click(function(){
		                $status.trigger('click');
		            }));
		    $("<div/>").appendTo($device).load("lib/html/device-manager.html", function(){
		    	$device.find('a.remove').click(function(){
		    		api.removeDevice(dev.id,function(){
		    			$device.find('.deviceManager').modal("hide").on('hidden', function(){
		    				$device.slideUp('slow');
		    			})
		    		})
		    	});
		    	$device.find("a.learn").click(function(){
		    		var $learn = $(this).fadeOut();
		    		api.sendLearnSignal(dev.id,function(){
		    			$learn.fadeIn();
		    		});
		    	});
		    });

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
		        			api.setDeviceChannelValue(dev.id,0,1, function(){
		        				api.setDeviceChannelValue(dev.id,1,dimmer);
		        			});
		        			$status.addClass('status-on');
		        		} else {
		        			api.setDeviceChannelValue(dev.id,1,dimmer);
		        		}
		        	}
		        },500);
		    }
		},

		destroy: function(){
			console.log("Kabom!");
		},

		_setOption : function(option,value){
			console.log("Setting " + option + " = " + value);
		}
	});

});