'use strict';

angular.module('app')
  .controller('DeviceFormCtrl', function ($scope, $modalInstance, util, device) {
    $scope.formattedType = util.formatType(device.type);
    $scope.device = device;

    $scope.save = function () {
      $scope.device.$save(function () {
        $modalInstance.close({ action: 'update', device: device});
      });
    };

    $scope.delete = function () {
      $scope.device.$delete(function () {
        $modalInstance.close({ action: 'delete' });
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
