'use strict';

angular.module('app')
  .directive('hkMessage', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="message-container"><div ng-show="show" ng-click="dismiss()" class="clickable alert alert-danger message" ng-bind="message"></div></div>',
      link: function (scope) {
        function setError(e, data) {
          console.log(data);
          var message = data.message === undefined ? data : data.message;
          scope.show = true;
          scope.message = message;
        }

        scope.dismiss = function () {
          scope.show = false;
          scope.message = '';
        };

        scope.$on('hkError', setError);
      }
    };
  });