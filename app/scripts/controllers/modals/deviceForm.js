'use strict';

angular.module('app')
  .controller('DeviceFormCtrl', function ($scope, $modalInstance, util, device) {
    $scope.formattedType = util.formatType(device.type);
    $scope.device = device;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
