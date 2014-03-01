'use strict';

angular.module('app')
  .factory('cache', function ($q, api) {
    var devices = api.Device.query();

    return {
      getDevices: function () {
        return devices;
      },
      getDeviceName: function (deviceId) {
        for (var i = 0; i < devices.length; i++) {
          if (devices[i].deviceId === deviceId) return devices[i].name;
        }
        return 'device' + deviceId;
      }
    };
  });