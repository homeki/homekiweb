'use strict';

angular.module('app')
  .directive('hkSpinner', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="spinner-container" ng-show="show"><div class="spinner-frame"><div class="spinner"></div>Loading ...</div></div>',
      scope: true,
      link: function (scope) {
        scope.$on('stillAwaitingResponse', function () {
          scope.show = true;
        });

        scope.$on('lastResponseReceived', function () {
          scope.show = false;
        });
      }
    }
  });