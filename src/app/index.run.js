(function() {
  'use strict';

  angular
    .module('zeropay')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $ionicLoading) {
  	$rootScope.passwordPattern = /^(?!\d+$|[a-zA-Z]+$|[\W-_]+$)[\s\S]{6,16}$/;
    $log.debug('runBlock end');

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide();
    })
  }

})();
