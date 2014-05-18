'use strict';

angular.module('app')
  .factory('cache', function ($rootScope, api) {
    function updateChannelValue(changeEvent) {
      for (var i = 0; i < devices.length; i++) {
        var d = devices[i];
        if (d.deviceId === changeEvent.deviceId) {
          for (var j = 0; j < d.channels.length; j++) {
            var c = d.channels[j];
            if (c.id === changeEvent.channel) {
              c.lastValue = changeEvent.value;
              $rootScope.$apply();
              return;
            }
          }
        }
      }
    }

    function subscribeToEvents() {
      if (!window.EventSource) return;
      var source = new EventSource(api.eventStreamUrl);
      source.addEventListener('message', function(e) {
        var changeEvent = JSON.parse(e.data);
        updateChannelValue(changeEvent);
      }, false);
    }

    function extendWithMeta() {
      for (var i = 0; i < devices.length; i++) {
        var d = devices[i];
        d.meta = {
          switch: findIdForChannelName(d.channels, 'Switch'),
          level: findIdForChannelName(d.channels, 'Level'),
          power: findIdForChannelName(d.channels, 'Power'),
          current: findIdForChannelName(d.channels, 'Current'),
          voltage: findIdForChannelName(d.channels, 'Voltage'),
          temperature: findIdForChannelName(d.channels, 'Temperature')
        };
      }

      subscribeToEvents();
    }

    var devices = api.Device.query(extendWithMeta);
    var triggers = api.Trigger.query();
    var actionGroups = api.ActionGroup.query();

    function findIdForChannelName(channels, name) {
      for (var i = 0; i < channels.length; i++) {
        var c = channels[i];
        if (c.name === name) return { id: c.id, idx: i };
      }
    }

    return {
      getDevices: function () {
        return devices;
      },
      getDeviceName: function (deviceId) {
        for (var i = 0; i < devices.length; i++) {
          if (devices[i].deviceId === deviceId) return devices[i].name;
        }
        return 'device' + deviceId;
      },
      getChannels: function (deviceId) {
        if (!deviceId) return [];

        for (var i = 0; i < devices.length; i++) {
          var d = devices[i];
          if (d.deviceId === deviceId) return d.channels;
        }

        return [];
      },
      getChannelName: function (deviceId, channel) {
        var channels = this.getChannels(deviceId);

        for (var i = 0; i < channels.length; i++) {
          var c = channels[i];
          if (c.id === channel) return c.name;
        }

        return channel;
      },
      getTriggers: function () {
        return triggers;
      },
      getActionGroups: function () {
        return actionGroups;
      },
      getActionGroupName: function (actionGroupId) {
        for (var i = 0; i < actionGroups.length; i++) {
          if (actionGroups[i].actionGroupId === actionGroupId) return actionGroups[i].name;
        }
        return 'actionGroup' + actionGroupId;
      }
    };
  });