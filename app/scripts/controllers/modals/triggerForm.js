'use strict';

angular.module('app')
  .controller('TriggerFormCtrl', function ($scope, $modalInstance, api, util, trigger) {
    if (trigger) {
      $scope.editMode = true;
      $scope.trigger = trigger;
    } else {
      $scope.editMode = false;
      $scope.trigger = new api.Trigger();
    }

    $scope.save = function () {
      $scope.trigger.$save(function () {
        $modalInstance.close({ type: 'save', trigger: $scope.trigger });
      });
    };

    $scope.delete = function () {
      $scope.trigger.$delete(function () {
        $modalInstance.close({ type: 'delete' });
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
