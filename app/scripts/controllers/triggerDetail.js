'use strict';

angular.module('app')
  .controller('TriggerDetailCtrl', function ($scope,  $routeParams, $sce, $modal, api, cache, util) {
    $scope.conditions = api.TriggerCondition.query({ triggerId: $routeParams.triggerId });
    $scope.actions = api.TriggerAction.query({ triggerId: $routeParams.triggerId });
    $scope.formatConditionType = util.formatConditionType;
    $scope.formatActionType = util.formatActionType;
    $scope.formatActionDescription = util.formatActionDescription;

    $scope.formatConditionDescription = function (condition) {
      switch (condition.type) {
        case 'channelvalue':
          return $sce.trustAsHtml('when <b>channel ' + cache.getChannelName(condition.deviceId, condition.channel) + '</b> on <b>' + cache.getDeviceName(condition.deviceId) + '</b> is <b>' + util.formatOperator(condition.operator) + ' ' + condition.value + '</b>');
        case 'minute':
          return $sce.trustAsHtml('at <b>' + util.formatTime(condition.hour, condition.minute) + '</b> on day(s) <b>' + condition.day + '</b> and weekdays <b>' + condition.weekday + '</b>');
        case 'specialvalue':
          return $sce.trustAsHtml('when <b>' + util.formatSource(condition.source) + '</b> is <b>' + util.formatOperator(condition.operator) + ' ' + condition.value + '</b>');
      }
    };

    $scope.addCondition = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/conditionForm.html',
        controller: 'ConditionFormCtrl',
        resolve: {
          triggerId: function () { return $routeParams.triggerId; },
          condition: function () {}
        }
      });

      modalInstance.result.then(function (result) {
        $scope.conditions.push(result.condition);
      });
    };

    $scope.addAction = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/actionForm.html',
        controller: 'ActionFormCtrl',
        resolve: {
          actionGroupId: function () {},
          triggerId: function () { return $routeParams.triggerId; },
          action: function () {}
        }
      });

      modalInstance.result.then(function (result) {
        $scope.actions.push(result.action);
      });
    };

    $scope.editCondition = function (index, condition) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/conditionForm.html',
        controller: 'ConditionFormCtrl',
        resolve: {
          triggerId: function () { return $routeParams.triggerId; },
          condition: function () { return angular.copy(condition); }
        }
      });

      modalInstance.result.then(function (result) {
        if (result.type === 'save') {
          angular.copy(result.condition, condition);
        } else {
          $scope.conditions.splice(index, 1);
        }
      });
    };

    $scope.editAction = function (index, action) {
      var modalInstance = $modal.open({
        templateUrl: 'views/modals/actionForm.html',
        controller: 'ActionFormCtrl',
        resolve: {
          actionGroupId: function () {},
          triggerId: function () { return $routeParams.triggerId; },
          action: function () { return angular.copy(action); }
        }
      });

      modalInstance.result.then(function (result) {
        if (result.type === 'save') {
          angular.copy(result.action, action);
        } else {
          $scope.actions.splice(index, 1);
        }
      });
    };
  });
