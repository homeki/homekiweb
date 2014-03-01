'use strict';

angular.module('app')
  .controller('ActionGroupDetailCtrl', function ($scope,  $routeParams, $sce, $modal, api, util) {
    $scope.actions = api.ActionGroupAction.query({ actionGroupId: $routeParams.actionGroupId });
    $scope.formatType = util.formatActionType;
    $scope.formatDescription = util.formatActionDescription;

    $scope.addAction = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/actionForm.html',
        controller: 'ActionFormCtrl',
        resolve: {
          actionGroupId: function () { return $routeParams.actionGroupId; },
          action: function () {},
          triggerId: function () {}
        }
      });

      modalInstance.result.then(function (result) {
        $scope.actions.push(result.action);
      });
    };

    $scope.editAction = function (index, action) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/actionForm.html',
        controller: 'ActionFormCtrl',
        resolve: {
          actionGroupId: function () { return $routeParams.actionGroupId; },
          action: function () { return angular.copy(action); },
          triggerId: function () {}
        }
      });

      modalInstance.result.then(function (result) {
        if (result.type === 'save') {
          angular.copy(result.action, action);
        } else {
          $scope.actions.splice(index, 1);
        }
      });
    };
  });
