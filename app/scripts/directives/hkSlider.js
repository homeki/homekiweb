'use strict';

angular.module('app')
  .directive('hkSlider', function ($document, $parse) {
    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      template: '<div class="progress clickable"><div class="progress-bar"><span class="sr-only"></span></div></div>',
      link: function (scope, elem, attrs, ctrl) {
        var changeFn = $parse(attrs.sliderChange);

        function getElemLeftRight() {
          return {
            left: elem[0].getBoundingClientRect().left,
            right: elem[0].getBoundingClientRect().right
          };
        }

        function getPercentage(x) {
          var offset = getElemLeftRight();
          var width = offset.right - offset.left;
          var left = x - offset.left;
          if (left < 0) left = 0;
          if (left > width) left = width;
          return ~~(left / width * 100);
        }

        function getX(e) {
          var x = e.x;
          if (e.changedTouches) x = e.changedTouches[0].screenX;
          return x;
        }

        var bar = angular.element(elem.children()[0]);

        ctrl.$render = function () {
          bar.css('width', Math.round(ctrl.$viewValue / 2.55) + '%');
        };

        elem.on('mousedown touchstart', function (e) {
          e.stopPropagation();
          e.preventDefault();
          $document.on('mouseup touchleave touchend', function (e) {
            var x = getX(e);
            var p = getPercentage(x);
            ctrl.$setViewValue(Math.round(p * 2.55));
            changeFn(scope);
            bar.css('width', p + '%');
            $document.off('mouseup mousemove touchleave touchend touchmove');
          });
          $document.on('mousemove touchmove', function (e) {
            e.preventDefault();
            var x = getX(e);
            bar.css('width', getPercentage(x) + '%');
          });
        });
      }
    };
  });
