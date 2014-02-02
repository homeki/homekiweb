'use strict';

angular.module('app')
  .controller('DeviceCtrl', function ($scope, $modal, api) {
    $scope.devices = api.Device.query();

    $scope.editDevice = function (device) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/deviceForm.html',
        controller: 'DeviceFormCtrl',
        resolve: {
          device: function () {
            return device;
          }
        }
      });

      modalInstance.result.then(function () {
        console.log('done');
      });
    };
  });
