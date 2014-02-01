'use strict';

angular.module('app')
  .controller('ConfigurationCtrl', function ($scope, $location) {
    $scope.routeIs = function (path) {
      return $location.path().startsWith(path);
    };
  });
