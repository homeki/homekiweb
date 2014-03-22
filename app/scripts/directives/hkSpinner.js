'use strict';

angular.module('app')
  .directive('hkSpinner', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="spinner-container"><div class="spinner" ng-show="show"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>',
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