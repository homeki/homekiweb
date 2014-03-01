'use strict';

angular.module('app')
  .controller('ConfigurationCtrl', function ($scope, $timeout, api) {
    $scope.server = api.Server.get();

    $scope.formatUptime = function (ms) {
      var d = ~~(ms / (24 * 3600 * 1000));
      ms -= d * 24 * 3600 * 1000;
      var h = ~~(ms / (3600 * 1000));
      ms -= h * 3600 * 1000;
      var m = ~~(ms / (60 * 1000));
      return d + ' days, ' + h + ' hours and ' + m + ' minutes';
    };

    $scope.save = function () {
      $scope.server.$save(function () {
        $scope.saved = true;
        $timeout(function () {
          $scope.saved = false;
        }, 2000);
      });
    };
  });
