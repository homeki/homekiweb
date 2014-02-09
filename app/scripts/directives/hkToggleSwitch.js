'use strict';

angular.module('app')
  .directive('hkToggleSwitch', function ($parse) {
    return {
      restrict: 'E',
      require: 'ngModel',
      replace: true,
      template: '<div class="btn-group"><button type="button" class="btn btn-default btn-down">Off</button><button type="button" class="btn btn-default">On</button></div>',
      link: function (scope, elem, attrs, ctrl) {
        var changeFn = $parse(attrs.toggleChange);

        var onBtn = angular.element(elem.children()[0]);
        var offBtn = angular.element(elem.children()[1]);

        ctrl.$render = function() {
          if (ctrl.$viewValue === 1) {
            onBtn.addClass('btn-down');
            offBtn.removeClass('btn-down');
          } else {
            onBtn.removeClass('btn-down');
            offBtn.addClass('btn-down');
          }
        };

        onBtn.on('click', function () {
          ctrl.$setViewValue(1);
          ctrl.$render();
          changeFn(scope);
        });
        offBtn.on('click', function () {
          ctrl.$setViewValue(0);
          ctrl.$render();
          changeFn(scope);
        });
      }
    };
  });
