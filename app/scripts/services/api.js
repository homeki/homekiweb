'use strict';

angular.module('app')
  .factory('api', function ($resource) {
    var DEV_SERVER = 'http://localhost:5000';

    return {
      Device: $resource(DEV_SERVER + '/api/device/list')
    };
  });