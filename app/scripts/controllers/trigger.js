'use strict';

angular.module('app')
  .controller('TriggerCtrl', function ($scope, $modal, cache, util) {
    $scope.triggers = cache.getTriggers();

    $scope.addTrigger = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/triggerForm.html',
        controller: 'TriggerFormCtrl',
        resolve: {
          trigger: function () {}
        }
      });

      modalInstance.result.then(function (result) {
        $scope.triggers.push(result.trigger);
        $scope.triggers.sort(util.alphabeticalCompareFunc('name'));
      });
    };

    $scope.editTrigger = function (index, trigger) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/triggerForm.html',
        controller: 'TriggerFormCtrl',
        resolve: {
          trigger: function () { return angular.copy(trigger); }
        }
      });

      modalInstance.result.then(function (result) {
        if (result.type === 'save') {
          angular.copy(result.trigger, trigger);
        } else {
          $scope.triggers.splice(index, 1);
        }
      });
    };
  });
