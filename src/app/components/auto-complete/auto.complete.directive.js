(function() {
  'use strict';

  angular
    .module('zeropay')
    .directive('autoComplete', autoComplete);

  /** @ngInject */
  function autoComplete($log, $filter, $parse, $timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/auto-complete/auto.complete.html',
      require:"ngModel",
      replace: true,
      scope: {
        input: '=ngModel',
        options: '='
      },
      link: function(scope, element, attr, ngModel) {
        var options = scope.options, last, isDelete = false;

        scope.label = attr.label;
        scope.placeholder = attr.placeholder;

        scope.$watch('input', function(modelValue, old) {
          scope.showSuggestions = !!modelValue && last !== modelValue;

          var results = scope.results = $filter('filter')(options, modelValue).slice(0, 5);

          isDelete = last && last.substr(0, last.length - 1) === modelValue;

          last = modelValue;
          if(results && results.length === 1 && !isDelete) {
            $timeout(function() {
              scope.input = last = results[0];
              scope.showSuggestions = false;
            }, 200);
          }
        });

        scope.focus = function() {
          document.querySelectorAll('[nav-view="active"] .scroll')[0].style.transform = 'translate3d(0%, -216px, 0px)'
        };

        scope.blur = function() {
          document.querySelectorAll('[nav-view="active"] .scroll')[0].style.transform = 'translate3d(0, 0, 0)'
        }

        scope.select = function(index) {
          scope.input = last = scope.results[index];
          scope.showSuggestions = false;
        };
      }
    };

    return directive;
  }

})();
