'use strict';

angular.module('app')
  .factory('loadingIndicatorInterceptor', function ($rootScope, $q, $timeout) {
    var pendingRequests = 0;
    var broadcastPromise;

    function onRequestSent() {
      if (++pendingRequests === 1) {
        $rootScope.$broadcast('awaitingResponse');
        broadcastPromise = $timeout(broadcastStillWaiting, 500);
      }
    }

    function broadcastStillWaiting() {
      $rootScope.$broadcast('stillAwaitingResponse');
    }

    function onResponseReceived() {
      if (--pendingRequests === 0) {
        broadcastPromise && $timeout.cancel(broadcastPromise);
        $rootScope.$broadcast('lastResponseReceived');
      }
    }

    return {
      request: function (config) {
        onRequestSent();
        return config || $q.when(config);
      },
      requestError: function (rejection) {
        onRequestSent();
        return $q.reject(rejection);
      },
      response: function (config) {
        onResponseReceived();
        return config || $q.when(config);
      },
      responseError: function (rejection) {
        onResponseReceived();
        return $q.reject(rejection);
      }
    };
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('loadingIndicatorInterceptor');
  }]);