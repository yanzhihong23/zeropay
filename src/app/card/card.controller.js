(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('CardController', CardController);

  /** @ngInject */
  function CardController($scope, $state, $ionicLoading, $ionicPopup, $log, UserApi) {
  	$scope.showAddCardPopup = function() {
      var addCardPopup = $ionicPopup.show({
        title: '银行卡信息',
        templateUrl: 'app/card/card.popup.html',
        scope: $scope,
        cssClass: 'popup-large'
      });
    };

    $scope.showPhoneAuthPopup = function() {
      var phoneAuthPopup = $ionicPopup.show({
        title: '手机验证',
        templateUrl: 'app/card/phone.popup.html',
        scope: $scope,
        cssClass: 'popup-large'
      });
    };

    $scope.sendVcode = function() {
      $log.debug('send vcode func');
    };
  }
})();
