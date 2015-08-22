(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $log) {
    var vm = this;
    $scope.my = {};
    $scope.send = function() {
      $log.debug('send func');
    }

    $scope.$watch('my', function(val) {
      $log.debug(val);
    }, true)

    $scope.$watch('file', function(val) {
      $log.debug(val);
      console.log(val);
    });

    $scope.onFileSelect = function($files, type) {
      console.log($files);
    }
  }
})();
