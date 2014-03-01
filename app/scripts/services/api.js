'use strict';

angular.module('app')
  .factory('api', function ($resource) {
    var DEV_SERVER = 'http://192.168.1.79:5000';

    return {
      Device: $resource(DEV_SERVER + '/api/devices/:deviceId', { deviceId: '@deviceId' }),
      DeviceChannel: $resource(DEV_SERVER + '/api/devices/:deviceId/channels/:channelId', { deviceId: '@deviceId', channelId: '@channelId' }),
      Trigger: $resource(DEV_SERVER + '/api/triggers/:triggerId', { triggerId: '@triggerId' }),
      TriggerCondition: $resource(DEV_SERVER + '/api/triggers/:triggerId/conditions/:conditionId', { triggerId: '@triggerId', conditionId: '@conditionId' }),
      TriggerAction: $resource(DEV_SERVER + '/api/triggers/:triggerId/actions/:actionId', { triggerId: '@triggerId', actionId: '@actionId' }),
      ActionGroup: $resource(DEV_SERVER + '/api/actiongroups/:actionGroupId', { actionGroupId: '@actionGroupId' }),
      ActionGroupAction: $resource(DEV_SERVER + '/api/actiongroups/:actionGroupId/actions/:actionId', { actionGroupId: '@actionGroupId', actionId: '@actionId'}),
      Server: $resource(DEV_SERVER + '/api/server')
    };
  });
