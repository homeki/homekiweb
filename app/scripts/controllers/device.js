'use strict';

angular.module('app')
  .controller('DeviceCtrl', function ($scope, $modal, api) {
    $scope.devices = api.Device.query();

    $scope.editDevice = function (index, device) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/deviceForm.html',
        controller: 'DeviceFormCtrl',
        resolve: {
          device: function () {
            return angular.copy(device);
          }
        }
      });

      modalInstance.result.then(function (result) {
        if (result.action === 'update') {
          angular.copy(result.device, device);
        } else {
          $scope.devices.splice(index, 1);
        }
      });
    };
  });
