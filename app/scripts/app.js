'use strict';

angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/devices', {
        templateUrl: 'views/device.html',
        controller: 'DeviceCtrl'
      })
      .when('/triggers', {
        templateUrl: 'views/trigger.html',
        controller: 'TriggerCtrl'
      })
      .when('/configuration', {
        templateUrl: 'views/configuration.html',
        controller: 'ConfigurationCtrl'
      })
      .otherwise({
        redirectTo: '/devices'
      });
  });
