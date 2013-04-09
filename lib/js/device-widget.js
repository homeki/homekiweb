define(['jquery','ext/jquery-ui','homeki-api'], function($,ui,api){

	var exports = {};


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

	function toggleEdit($holder){
		//var $this = $(this);
			//$holder = $this.parents("modal").sibling(".device-holder");
			
		if($holder.hasClass("editing")){
			$holder.find("button.manage").removeAttr("disabled");
			//$($holder.parent().siblings()).slideDown();
			data = [];
			$(".editor",$holder).each(function(){
				var $$= $(this),
				    $for = $$.data("for");
					$for.text($$.val()).show();
					data.push($$.val());
					$$.remove();
			});
			api.setDeviceProperties($holder.data("id"), data[0], data[1]);
			//$this.html("Edit");
		} else {
			$(".editable",$holder).each(function(){
				var $$ = $(this);
				$(this).before($("<input/>").addClass("editor")
					.attr("type","text")
					.data("for",$$)
					.keyup(function(e){
		            	if (e.keyCode == 13) toggleEdit($holder);
		            })
					.val($$.text()))
				.hide();
				$holder.find("button.manage").attr("disabled","disabled");
				//$($holder.parent().siblings()).slideUp();
			});
			//$this.html("Save");
		}
		$holder.toggleClass("editing");
	}

	exports.toggleDevice = function(deviceId,cb){
        api.requestDeviceStatus(deviceId, function(device) {
            if(device) {
                var wasOn = api.deviceIsOn(device);
                $.kijax(sprintf('/device/%d/channel/0/set?value=%d',device.id,api.deviceIsOn(device) ? 0 : 1),
                	function(data){
                        setTimeout(function(){
                            api.requestDeviceStatus(deviceId, function(device) {
                                if(wasOn == api.deviceIsOn(device)) window.console && console.log("Status did not change!");
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

	$.widget("homeki.tellstick", {
		options : {
		},

		_create : function() {
			var self = this,
				o    = self.options,
				el   = self.element,
				$el  = $(el),
				dev  = o.device;
			var $device = $(el).load("lib/html/device-widget.html", function(){
		  		var values = api.channelValues(dev),
		  			isOn   = values[0] == 1,
		  			dimmer = values[1];
			    var $status      = $el.find(".status-icon"),
			        $title       = $el.find(".title"),
			        $description = $el.find(".description"),
			        $edit        = $el.find("button.edit"),
			        $switch      = $el.find("button.switch"),
			        $manage      = $el.find("button.manage");
			    var $holder = $el.find('.device-holder').data("id",dev.id);

			    $title.html(dev.name);
			    $description.html(dev.description);
			    
			    $manage.click(function(){
					$device.find('.deviceManager').modal('show');
			    });
			    $status.toggleClass('status-on',isOn).data(dev).bind('click', exports.toggleDeviceFunction);
			    $switch.click(function(){
			    	$status.trigger('click');
			    });
			    $("<div/>").appendTo($device).load("lib/html/device-manager.html", function(){
			    	var $this = $(this);
			    	$this.find('a.edit').click(function(){
			    		$this.children(".modal").modal('hide');
			    		toggleEdit($holder);
			    	});
			    	$this.find(".deviceName").html(dev.name);
			    	$this.find('a.remove').click(function(){
			    		api.removeDevice(dev.id,function(){
			    			$device.find('.deviceManager').modal("hide").on('hidden', function(){
			    				$device.slideUp('slow');
			    			})
			    		})
			    	});
			    	$(this).find("a.learn").click(function(){
			    		var $learn = $(this).fadeOut();
			    		api.sendLearnSignal(dev.id,function(){
			    			$learn.fadeIn();
			    		});
			    	});
			    });
			    if(dev.type == 'dimmer'){
			        var $slider = $el.find('.switch-slider').slider({
			        	min: 0,
			        	max: 255,
			        	value: dimmer,
			        });
			        var timer = setInterval(function(){
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
			});
		},

		destroy: function(){
			console.log("Kabom!");
		},

		_setOption : function(option,value){
			console.log("Setting " + option + " = " + value);
		}
	});

	$.widget("homeki.termometer", {
		options : {
		},

		_create : function() {
			var self = this,
				o    = self.options,
				el   = self.element,
				$el  = $(el),
				dev  = o.device;
			var $device = $(el).load("lib/html/device-widget.html", function(){
		  		var values = api.channelValues(dev),
		  			isOn   = values[0] == 1,
		  			dimmer = values[1];
			    var $status      = $el.find(".status-icon"),
			        $title       = $el.find(".title"),
			        $description = $el.find(".description"),
			        $edit        = $el.find("button.edit"),
			        $switch      = $el.find("button.switch"),
			        $manage      = $el.find("button.manage");
			    var $holder = $el.find('.device-holder').data("id",dev.id);

			    $title.html(dev.name);
			    $description.html(dev.description);
			    
			    $manage.click(function(){
					$device.find('.deviceManager').modal('show');
			    });
			    $status.toggleClass('status-on',isOn).data(dev).bind('click', exports.toggleDeviceFunction);
			    $switch.click(function(){
			    	$status.trigger('click');
			    });
			    $("<div/>").appendTo($device).load("lib/html/device-manager.html", function(){
			    	var $this = $(this);
			    	$this.find('a.edit').click(function(){
			    		$this.children(".modal").modal('hide');
			    		toggleEdit($holder);
			    	});
			    	$this.find(".deviceName").html(dev.name);
			    	$this.find('a.remove').click(function(){
			    		api.removeDevice(dev.id,function(){
			    			$device.find('.deviceManager').modal("hide").on('hidden', function(){
			    				$device.slideUp('slow');
			    			})
			    		})
			    	});
			    	$(this).find("a.learn").click(function(){
			    		var $learn = $(this).fadeOut();
			    		api.sendLearnSignal(dev.id,function(){
			    			$learn.fadeIn();
			    		});
			    	});
			    });
			    if(dev.type == 'dimmer'){
			        var $slider = $el.find('.switch-slider').slider({
			        	min: 0,
			        	max: 255,
			        	value: dimmer,
			        });
			        var timer = setInterval(function(){
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
			});
		},

		destroy: function(){
			console.log("Kabom!");
		},

		_setOption : function(option,value){
			console.log("Setting " + option + " = " + value);
		}
	});
});