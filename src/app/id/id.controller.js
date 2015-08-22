(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('IdController', IdController);

  /** @ngInject */
  function IdController($scope, $state, $ionicLoading, $ionicPopup, $log, UserApi) {
  	$scope.showFrontPopup = function() {
  		var popup = $ionicPopup.show({
  			title: '身份证正面上传',
  			templateUrl: 'app/id/front.popup.html',
  			scope: $scope,
  			cssClass: 'popup-large'
  		});
  	};

  	$scope.showHoldPopup = function() {
  		var popup = $ionicPopup.show({
  			title: '手持身份证示例',
  			templateUrl: 'app/id/hold.popup.html',
  			scope: $scope,
  			cssClass: 'popup-large'
  		});
  	};
  }
})();
