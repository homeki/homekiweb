'use strict';

angular.module('app')
  .controller('DeviceFormCtrl', function ($scope, $modalInstance, api, device) {
    if (device) {
      $scope.editMode = true;
      $scope.device = device;
    } else {
      $scope.editMode = false;
      $scope.device = new api.Device();
    }

    $scope.save = function () {
      $scope.device.$save(function () {
        $modalInstance.close({ type: 'save', device: $scope.device});
      });
    };

    $scope.delete = function () {
      $scope.device.$delete(function () {
        $modalInstance.close({ type: 'delete' });
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
