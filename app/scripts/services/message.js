'use strict';

angular.module('app')
  .factory('errorInterceptor', function ($q, $rootScope) {
    return {
      responseError: function (response) {
        if (response.status === 0) {
          $rootScope.$broadcast('hkError', 'Failed to connect to Homeki Server.');
        } else if (response.status === 400 || response.status === 500) {
          $rootScope.$broadcast('hkError', response.data);
        } else {
          $rootScope.$broadcast('hkError', 'An unknown error occured, received HTTP status ' + response.status + ' from server.');
        }

        return $q.reject(response);
      }
    };
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
  });