'use strict';

angular.module('app')
  .controller('ActionGroupFormCtrl', function ($scope, $modalInstance, api, util, actionGroup) {
    if (actionGroup) {
      $scope.editMode = true;
      $scope.actionGroup = actionGroup;
    } else {
      $scope.editMode = false;
      $scope.actionGroup = new api.ActionGroup();
    }

    $scope.save = function () {
      $scope.actionGroup.$save(function () {
        $modalInstance.close({ type: 'save', actionGroup: $scope.actionGroup });
      });
    };

    $scope.delete = function () {
      $scope.actionGroup.$delete(function () {
        $modalInstance.close({ type: 'delete' });
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
