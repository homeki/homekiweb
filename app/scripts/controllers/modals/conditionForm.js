'use strict';

angular.module('app')
  .controller('ConditionFormCtrl', function ($scope, $modalInstance, api, cache, util, triggerId, condition) {
    $scope.devices = cache.getDevices();
    $scope.formatType = util.formatConditionType;
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
      $scope.condition.$save({ triggerId: triggerId }, function (updatedCondition) {
        $scope.condition.customSource = updatedCondition.customSource; // should be automatically updated but is not (?)
        $modalInstance.close({ type: 'save', condition: $scope.condition });
      });
    };

    $scope.delete = function () {
      $scope.condition.$delete({ triggerId: triggerId }, function () {
        $modalInstance.close({ type: 'delete' });
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
