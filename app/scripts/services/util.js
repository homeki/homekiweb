'use strict';

angular.module('app')
  .factory('util', function ($sce, cache) {
    return {
      alphabeticalCompareFunc: function (prop) {
        return function (a, b) {
          var aval = a[prop].toLowerCase();
          var bval = b[prop].toLowerCase();
          if (aval < bval) return -1;
          if (aval > bval) return 1;
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
            return 'Send E-mail';
          default:
            return type;
        }
      },
      formatActionDescription: function (action) {
        switch (action.type) {
          case 'changechannelvalue':
            return $sce.trustAsHtml('set <b>channel ' + cache.getChannelName(action.deviceId, action.channel) + '</b> on <b>' + cache.getDeviceName(action.deviceId) + '</b> to <b>' + action.value + '</b>');
          case 'triggeractiongroup':
            return $sce.trustAsHtml('trigger <b>' + cache.getActionGroupName(action.actionGroupId) + '</b>');
          case 'sendmail':
            return $sce.trustAsHtml('send e-mail with subject <b>' + action.subject + '</b> to <b>' + action.recipients + '</b>');
        }
      },
      formatOperator: function (op) {
        switch (op) {
          case 'EQ':
            return 'equal to';
          case 'LT':
            return 'less than';
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