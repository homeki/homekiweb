'use strict';

angular.module('app')
  .controller('ActionFormCtrl', function ($scope, $modalInstance, api, cache, util, triggerId, actionGroupId, action) {
    $scope.devices = cache.getDevices();
    $scope.actionGroups = cache.getActionGroups();
    $scope.formatType = util.formatActionType;
    $scope.getChannels = cache.getChannels;

    if (action) {
      $scope.editMode = true;
      $scope.action = action;
    } else {
      $scope.editMode = false;
      $scope.action = triggerId ? new api.TriggerAction() : new api.ActionGroupAction();
    }

    $scope.save = function () {
      $scope.action.$save({ triggerId: triggerId, actionGroupId: actionGroupId }, function () {
        $modalInstance.close({ type: 'save', action: $scope.action });
      });
    };

    $scope.delete = function () {
      $scope.action.$delete({ triggerId: triggerId, actionGroupId: actionGroupId }, function () {
        $modalInstance.close({ type: 'delete' });
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
