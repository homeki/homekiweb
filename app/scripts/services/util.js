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
      },
      formatConditionType: function (type) {
        switch (type) {
          case 'channelvalue':
            return 'Device Channel Value';
          case 'minute':
            return 'Time/Date';
          case 'specialvalue':
            return 'Special Value';
          default:
            return type;
        }
      },
      formatActionType: function (type) {
        switch (type) {
          case 'changechannelvalue':
            return 'Change Channel Value';
          case 'triggeractiongroup':
            return 'Trigger Action Group';
          case 'sendmail':
            return 'Send E-mail'
          default:
            return type;
        }
      },
      formatOperator: function (op) {
        switch (op) {
          case 'EQ':
            return 'equal to';
          case 'LT':
            return 'lesser than';
          case 'GT':
            return 'greater than';
          default:
            return 'unknown';
        }
      },
      formatTime: function(hour, minute) {
        var result = '';
        if (hour < 10) result = '0';
        result += hour + ':';
        if (minute < 10) result += '0';
        result += minute;
        return result;
      },
      formatSource: function(source) {
        switch (source) {
          case 'CONNECTED_CLIENTS':
            return 'connected clients';
          case 'SUNRISE_SUNSET':
            return 'sunrise/sunset';
          default:
            return source;
        }
      }
    };
  });