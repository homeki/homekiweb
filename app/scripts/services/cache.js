'use strict';

angular.module('app')
  .factory('cache', function (api) {
    var devices = api.Device.query();
    var triggers = api.Trigger.query();
    var actionGroups = api.ActionGroup.query();

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