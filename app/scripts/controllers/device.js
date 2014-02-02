'use strict';

angular.module('app')
  .controller('DeviceCtrl', function ($scope, $modal, api) {
    $scope.devices = api.Device.query();

    $scope.editDevice = function (device) {
      $modal.open({
        templateUrl: 'views/modals/deviceForm.html',
        controller: 'DeviceFormCtrl',
        resolve: {
          device: function () {
            return device;
          }
        }
      });
    };
  });
