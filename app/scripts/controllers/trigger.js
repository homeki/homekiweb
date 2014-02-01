'use strict';

angular.module('app')
  .controller('TriggerCtrl', function ($scope, $location) {
    $scope.routeIs = function (path) {
      return $location.path().startsWith(path);
    };
  });
