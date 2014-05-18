'use strict';

angular.module('app')
  .controller('DeviceCtrl', function ($scope, $modal, api, cache, util) {
    $scope.devices = cache.getDevices();

    $scope.setChannel = function (device, channelInfo) {
      var deviceChannel = new api.DeviceChannel();
      deviceChannel.value = device.channels[channelInfo.idx].lastValue;
      deviceChannel.$save({ deviceId: device.deviceId, channelId: channelInfo.id });
    };

    $scope.addDevice = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/deviceForm.html',
        controller: 'DeviceFormCtrl',
        resolve: { device: function () {} }
      });

      modalInstance.result.then(function (result) {
        $scope.devices.push(result.device);
        $scope.devices.sort(util.alphabeticalCompareFunc('name'));
      });
    };

    $scope.editDevice = function (index, device) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/deviceForm.html',
        controller: 'DeviceFormCtrl',
        resolve: {
          device: function () { return angular.copy(device); }
        }
      });

      modalInstance.result.then(function (result) {
        if (result.type === 'save') {
          angular.copy(result.device, device);
        } else {
          $scope.devices.splice(index, 1);
        }
      });
    };
  });
