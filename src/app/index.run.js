(function() {
  'use strict';

  angular
    .module('zeropay')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $ionicLoading, userService) {
  	$rootScope.passwordPattern = /^(?!\d+$|[a-zA-Z]+$|[\W-_]+$)[\s\S]{6,16}$/;

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide();
    });

    // auto login
    userService.autoLogin();
  }

})();
