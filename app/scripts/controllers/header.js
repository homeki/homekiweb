'use strict';

angular.module('app')
  .controller('HeaderCtrl', function ($scope, $location) {
    $scope.routeIs = function (path) {
      return $location.path().indexOf(path) === 0;
    };
  });
