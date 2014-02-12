'use strict';

angular.module('app')
  .factory('util', function () {
    return {
      formatType: function (type) {
        switch (type) {
          case 'switch':
            return 'Switch';
          case 'dimmer':
            return 'Dimmer';
          case 'thermometer':
            return 'Thermometer';
        }
      },
      alphabeticalCompareFunc: function (prop) {
        return function (a, b) {
          if (a[prop] < b[prop]) return -1;
          if (a[prop] > b[prop]) return 1;
          return 0;
        };
      }
    };
  });