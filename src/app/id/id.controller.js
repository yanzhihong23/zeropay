(function() {
  'use strict';

  angular
    .module('zeropay')
    .controller('IdController', IdController);

  /** @ngInject */
  function IdController($scope, $state, $ionicLoading, $ionicPopup, $log, UserApi) {
  	var frontPopup, holdPopup;
  	$scope.showFrontPopup = function() {
  		frontPopup = $ionicPopup.show({
  			title: '身份证正面上传',
  			templateUrl: 'app/id/front.popup.html',
  			scope: $scope,
  			cssClass: 'popup-large'
  		});
  	};

  	$scope.showHoldPopup = function() {
  		holdPopup = $ionicPopup.show({
  			title: '手持身份证示例',
  			templateUrl: 'app/id/hold.popup.html',
  			scope: $scope,
  			cssClass: 'popup-large'
  		});
  	};

  	$scope.file = {};

  	$scope.$watch('file.front', function (newVal) {
      if (newVal) {
      	frontPopup.close();
        $log.debug(newVal);
      }
    });

    $scope.$watch('file.hold', function (newVal) {
      if (newVal) {
      	holdPopup.close();
        $log.debug(newVal);
      }
    });
  }
})();
