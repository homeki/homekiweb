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
      }
    };
  });