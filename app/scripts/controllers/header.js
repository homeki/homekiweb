'use strict';

angular.module('app')
  .controller('HeaderCtrl', function ($scope, $location) {
    $scope.collapsed = true;
    $scope.routeIs = function (path) {
      return $location.path().indexOf(path) === 0;
    };
  });
