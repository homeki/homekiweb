'use strict';

angular.module('app')
  .controller('ActionFormCtrl', function ($scope, $modalInstance, api, cache, util, triggerId, action) {
    $scope.devices = cache.getDevices();
    $scope.actionGroups = cache.getActionGroups();
    $scope.formatType = util.formatActionType;

    if (action) {
      $scope.editMode = true;
      $scope.action = action;
    } else {
      $scope.editMode = false;
      $scope.action = new api.TriggerAction();
    }

    $scope.save = function () {
      $scope.action.$save({ triggerId: triggerId }, function () {
        $modalInstance.close({ type: 'save', action: $scope.action });
      });
    };

    $scope.delete = function () {
      $scope.action.$delete({ triggerId: triggerId }, function () {
        $modalInstance.close({ type: 'delete' });
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
