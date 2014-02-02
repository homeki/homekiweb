'use strict';

angular.module('app')
  .controller('DeviceFormCtrl', function ($scope, $modalInstance, util, device) {
    $scope.formattedType = util.formatType(device.type);
    $scope.device = angular.copy(device);

    $scope.save = function () {
      function onSuccess() {
        angular.copy($scope.device, device);
        $modalInstance.close();
      }

      $scope.device.$save(onSuccess);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
