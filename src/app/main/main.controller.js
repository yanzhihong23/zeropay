(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, $stateParams, $ionicLoading, $location, $log, OPENID, utils, userService, NonoWebApi, localStorageService) {
    var search = utils.getLocationSearch();

    if(search.clear) {
      $log.info('clear local storage');
      localStorageService.clearAll();
    }

    $ionicLoading.show();
    var user = userService.getUser();

    var studentAuthCheck = function() {
      $ionicLoading.show();
      NonoWebApi.isAuthenticatedSchoolRoll({phone: user.phone})
        .success(function(data) {
          if(+data.result === 1) { // authenticated
            creditActivateCheck();
          } else {
            $state.go('studentAuth');
          }
        });
    };

    var creditActivateCheck = function() {
      $ionicLoading.show();
      NonoWebApi.isPaymentActivated()
        .success(function(data) {
          if(+data.result === 1) { // activated
            var user = userService.getUser();
            user.activated = true;
            userService.setUser(user);

            $state.go('account');
          } else {
            // need to fix android webview issue
            $state.go('card');
            // var process = userService.getProcess();
            // if(process === 'bindCard') {
            //   $state.go('card');
            // } else if(process === 'uploadId') {
            //   $state.go('id');
            // } else {
            //   Math.random()*10000 > 5000 ? $state.go('card') : $state.go('id');
            // }
          }
        });
    };

    if(!user) {
      $state.go('phone');
    } else if(user.credit && user.activated) {
      $state.go('account');
    } else {
      studentAuthCheck();
    }
  }
})();
