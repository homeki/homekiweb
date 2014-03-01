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
      .when('/triggers/:triggerId', {
        templateUrl: 'views/triggerDetail.html',
        controller: 'TriggerDetailCtrl'
      })
      .when('/actiongroups', {
        templateUrl: 'views/actionGroup.html',
        controller: 'ActionGroupCtrl'
      })
      .when('/actiongroups/:actionGroupId', {
        templateUrl: 'views/actionGroupDetail.html',
        controller: 'ActionGroupDetailCtrl'
      })
      .when('/configuration', {
        templateUrl: 'views/configuration.html',
        controller: 'ConfigurationCtrl'
      })
      .otherwise({
        redirectTo: '/devices'
      });
  });
