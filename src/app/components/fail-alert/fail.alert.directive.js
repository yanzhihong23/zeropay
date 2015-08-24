(function() {
  'use strict';

  angular
    .module('zeropay')
    .directive('failAlert', failAlert);

  /** @ngInject */
  function failAlert() {
    var directive = {
      restrict: 'E',
      // require: 'msg',
      replace: true,
      templateUrl: 'app/components/fail-alert/fail.alert.html',
      scope: true,
      link: function(scope, element, attr) {
        scope.msg = attr.msg;
      }
    };

    return directive;
  }

})();
