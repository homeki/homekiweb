'use strict';

angular.module('app')
  .controller('ActionGroupCtrl', function ($scope, $modal, cache, util) {
    $scope.actionGroups = cache.getActionGroups();

    $scope.addActionGroup = function () {
      $scope.actionGroups.sort(util.alphabeticalCompareFunc('name'));

      var modalInstance = $modal.open({
        templateUrl: 'views/modals/actionGroupForm.html',
        controller: 'ActionGroupFormCtrl',
        resolve: {
          actionGroup: function () {}
        }
      });

      modalInstance.result.then(function (result) {
        $scope.actionGroups.push(result.actionGroup);
        $scope.actionGroups.sort(util.alphabeticalCompareFunc('name'));
      });
    };

    $scope.editActionGroup = function (index, actionGroup) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/actionGroupForm.html',
        controller: 'ActionGroupFormCtrl',
        resolve: {
          actionGroup: function () { return angular.copy(actionGroup); }
        }
      });

      modalInstance.result.then(function (result) {
        if (result.type === 'save') {
          angular.copy(result.actionGroup, actionGroup);
        } else {
          $scope.actionGroups.splice(index, 1);
        }
      });
    };
  });
