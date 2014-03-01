'use strict';

angular.module('app')
  .controller('ConditionFormCtrl', function ($scope, $modalInstance, api, cache, util, triggerId, condition) {
    $scope.devices = cache.getDevices();
    $scope.formatType = util.formatType;
    $scope.formatOperator = util.formatOperator;
    $scope.formatSource = util.formatSource;

    if (condition) {
      $scope.editMode = true;
      $scope.condition = condition;
    } else {
      $scope.editMode = false;
      $scope.condition = new api.TriggerCondition();
    }

    $scope.save = function () {
      $scope.condition.$save({ triggerId: triggerId }, function () {
        $modalInstance.close({ action: 'save', condition: $scope.condition });
      });
  };

    $scope.delete = function () {
      $scope.condition.$delete({ triggerId: triggerId }, function () {
        $modalInstance.close({ action: 'delete' });
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
