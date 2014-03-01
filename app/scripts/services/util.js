'use strict';

angular.module('app')
  .factory('util', function () {
    return {
      alphabeticalCompareFunc: function (prop) {
        return function (a, b) {
          if (a[prop] < b[prop]) return -1;
          if (a[prop] > b[prop]) return 1;
          return 0;
        };
      }
    };
  });